import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import Session from "./app/session/page"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [

    DuendeIDS6Provider({
      id: 'id-server',
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:5000",
      authorization: { params: { scope: 'openid profile auctionApp' } },
      idToken: true
    } as OIDCConfig<Omit<Profile, 'username'>>),


  ],

  // jeśli obiekt auth jest wypełniony kontunuujemy nasza sesje, jesli nie  kieruje nas na strone logowania
  callbacks: {

    async authorized({ auth }) {

      return !!auth

    },



    async jwt({ token, profile, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token
      }


      if (profile) {

        token.username = profile.username

      }
      return token;
    },


    //wydobycie informacji o tokenie na stronie informacyjnej seesji 

    async session({ session, token }) {


      if (token) {
        session.user.username = token.username;
        session.accessToken = token.accessToken;

      }
      return session;
    }
  }
})

using System.Diagnostics;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;

namespace IdentificationService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("auctionApp", "Auction app full acces"),
          
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {

        //dodawanie nowego klienta w tym przypadku Postman

          new Client
          {

            ClientId="postman",
            ClientName = "Postman",
            AllowedScopes = {"openid", "profile", "auctionApp"},
            RedirectUris = {"https://wwwgetpostman.com/oauth2/callback"},
            ClientSecrets = new[] {new Secret("NotASecret".Sha256())},
            AllowedGrantTypes = {GrantType.ResourceOwnerPassword}
          }

           
        };
}

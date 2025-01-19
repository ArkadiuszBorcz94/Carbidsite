
//deklaracja że to jest komponent po stronie klienta
//'use client'
import React from 'react'
import Searching from "./Searching";
import SiteLogo from "./SiteLogo";

import LoginToButton from "./LoginToButton";
import { getCurrentUser } from "../actions/actionOfAuth";
import ActionsOfUser from "./ActionsOfUser";

export default async function Navbar() {

  const user = await getCurrentUser();
  

  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md '>
      <SiteLogo/>
      <Searching/>
      

      {user ? (
//w ależności zczyu użykownik jest zalogowany wyświetla odpwoiedni przycisk

        <ActionsOfUser user={user}/>
      ):(
        <LoginToButton/>
        
      )}
     
    </header>
  );
}

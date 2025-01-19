
//deklaracja że to jest komponent po stronie klienta
'use client'
//import ikony auta
import { FaCarSide } from "react-icons/fa";


import React from 'react'
import Searching from "./Searching";
import SiteLogo from "./SiteLogo";
import { useParamsStore } from "@/hooks/storeParamsUsed";

export default function Navbar() {
  

  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md '>
      <SiteLogo/>
      <Searching/>
      <div>Zaloguj</div>
    </header>
  )
}

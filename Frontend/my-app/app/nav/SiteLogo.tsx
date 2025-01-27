'use client'

import { useParamsStore } from '@/hooks/storeParamsUsed';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCarSide } from 'react-icons/fa'

export default function SiteLogo() {

  const router=useRouter();
  const pathName= usePathname();

//powrót na strone główną po kliknięciu w logo
  function doReset(){

    if (pathName!=='/') router.push('/')
      reset();

  }
   
   //resetowanie stanu strony przez klikniecie loga
    const reset= useParamsStore(state=> state.reset);
  
    return (
    <div onClick={doReset} className=" cursor-pointer flex items-center gap-3 text-3xl font-bold text-black">
        
    <FaCarSide size={34}/>
    <div>CarBidSite Aukcje</div>
  </div>
  )
}




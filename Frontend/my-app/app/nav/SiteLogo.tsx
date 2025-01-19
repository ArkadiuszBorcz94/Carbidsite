'sue client'

import { useParamsStore } from '@/hooks/storeParamsUsed';
import React from 'react'
import { FaCarSide } from 'react-icons/fa'

export default function SiteLogo() {
   
   //resetowanie stanu strony przez klikniecie loga
    const reset= useParamsStore(state=> state.reset);
  
    return (
    <div onClick={reset} className=" cursor-pointer flex items-center gap-2 text-3xl font font-semibold text-red-500">
        
    <FaCarSide size={34}/>
    <div>CarBidSite Aukcje</div>
  </div>
  )
}




'use client'

import { useParamsStore } from '@/hooks/storeParamsUsed'
import React, { useState } from 'react'
import { MdScreenSearchDesktop } from "react-icons/md"

export default function Searching() {
//wykrywanie śledzenie tego co jest wypisywane w pasku wyszukiwania
const setParams =useParamsStore(state=> state.setParams)
const setSearchValue=useParamsStore(state=>state.setSearchValue);
const searchValue=useParamsStore(state=>state.searchValue);


  function onChange(event: any){
      setSearchValue(event.target.value);
  }

//ustawienie wyszukiwanego hasła na dowolną wartość
 function search(){
  setParams({searchTerm: searchValue});

 }

  return (
    <div className='flex w-[20%] items-center border-2 rounded-s-full py-2 shadow-sm'>
        <input 
// rozpoczęcie wyszukiwania hasła po nacisnięciu ENTER
        onKeyDown={(e: any)=>{
          if (e.key==='Enter') search()
        }}


        onChange={onChange}
        type="text"
        placeholder='Wyszukaj samochód'
        value={searchValue}
        className='

        flex-grow
        pl-7
        bg-transparent
        focus:outline-none
        border-transparent
        focus:border-transparent
        focus:ring-0
        text-smtext-gray-600
        '
        />
    <button onClick={search}>
    <MdScreenSearchDesktop size={38} className='bg-grey-400 text-black rounded-full p-0.5 cursor-pointer mx-2 '/>

    </button>

    </div>
  )
}

'use client'

import { useParamsStore } from '@/hooks/storeParamsUsed'
import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AiFillTrophy } from 'react-icons/ai'
import { GiPodiumWinner } from 'react-icons/gi'
import { HiUser } from 'react-icons/hi'
import { ImProfile } from 'react-icons/im'
import { MdExitToApp, MdLibraryAdd } from 'react-icons/md'
import { PiCardsBold } from "react-icons/pi";


type Props ={
  user: User

}

export default function ActionsOfUser({user}: Props) {
  const router=useRouter();
  const pathname=usePathname();
  const setParams=useParamsStore(state=>state.setParams );
 
  function setWinner(){
    setParams({winner: user.username, seller: undefined})

    if(pathname !=='/') router.push('/');
  }

  function setSeller(){
    setParams({seller: user.username, winner: undefined})

    if(pathname !=='/') router.push('/');
  }



  return (
   <Dropdown inline label={`Użytkownik:  ${user.name}`}>
    <DropdownItem icon={PiCardsBold}  onClick={setSeller} >
        Moje
    </DropdownItem>

    <DropdownItem icon={GiPodiumWinner} onClick={setWinner}>
        Wygrane
    </DropdownItem>


    <DropdownItem icon={MdLibraryAdd}>
      <Link href='/auctions/create'>
        Dodaj
      </Link>

      
    </DropdownItem>
    <DropdownItem icon={ImProfile}>
      <Link href='/session'>
        Profil
      </Link>

      
    </DropdownItem>
    <DropdownDivider/>

    
    <DropdownItem icon={MdExitToApp} onClick={()=>signOut({callbackUrl: '/'})}>
      Wyloguj
      
    </DropdownItem>
   </Dropdown>
    
  )
}

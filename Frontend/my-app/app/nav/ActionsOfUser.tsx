'use client'

import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

  const router = useRouter();
  return (
   <Dropdown inline label={`Użytkownik:  ${user.name}`}>
    <DropdownItem icon={PiCardsBold}>
      <Link href='/'>
        Moje
      </Link>

      
    </DropdownItem>
    <DropdownItem icon={GiPodiumWinner}>
      <Link href='/'>
        Wygrane
      </Link>

      
    </DropdownItem>
    <DropdownItem icon={MdLibraryAdd}>
      <Link href='/'>
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

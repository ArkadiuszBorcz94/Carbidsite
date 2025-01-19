'use client'

import { signIn } from 'next-auth/react' 
import { Button } from 'flowbite-react'
import React from 'react'

export default function LoginToButton() {
  return (
   <Button outline onClick={()=> signIn('id-server', {callbackUrl: '/'}, {prompt: 'login' })}>
    
    Zaloguj

   </Button>
 


)
}

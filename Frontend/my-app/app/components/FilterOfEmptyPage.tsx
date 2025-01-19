
'use client'

import { useParamsStore } from '@/hooks/storeParamsUsed'
import React from 'react'
import Headings from './Headings'
import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'

type Props={

title?: string
subtitle?:string
showReset?: boolean
showLogin?: boolean
callbackUrl?: string


}



export default function FilterOfEmptyPage({
    title =' Nie znalezionow wyników dla zaznaczonego filtru',
    subtitle='Ustaw inny filtr',
    showReset,
    showLogin,
    callbackUrl
}: Props )
{
const reset = useParamsStore(state=> state.reset);
  return (
    <div className='h-[40vh flex flex-col gap-2 justify-center items-center shadow-lg]'>
            <Headings title={title} subtitle={subtitle} center/>
            <div className='mt-4'>
                {showReset && (
                    <Button outline onClick={reset}>Zmień filtry</Button>
                
                )}
                 {showLogin && (
                    <Button outline onClick={()=>signIn('id-server', {callbackUrl})}>Login</Button>
                
                )}


            </div>

    </div>
  )
}

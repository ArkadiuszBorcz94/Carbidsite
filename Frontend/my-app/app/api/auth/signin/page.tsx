
import FilterOfEmptyPage from '@/app/components/FilterOfEmptyPage'
import React from 'react'

export default function SignIn({searchParams}:{searchParams: {callbackUrl: string}}) {
  return (
    <FilterOfEmptyPage

    title='Dla tego działania musisz być zalogowany'
    subtitle='Zaloguj się używając opcji poniżej'
    showLogin
    callbackUrl={searchParams.callbackUrl}


    />




    
    
  )
}

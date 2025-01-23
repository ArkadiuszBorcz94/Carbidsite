import Headings from '@/app/components/Headings'
import React from 'react'
import FormOfAuctions from '../FormOfAuctions'

export default function CreateAuction () {
  return (


    <div className='mx-auto max-w-[50%] shadow-2xl p-20 bg-neutral-200 rounded-3xl'>
      <Headings  title='Dodaj nową aukcję' subtitle={''}/>
    <FormOfAuctions/>
    </div>
  )
}
 
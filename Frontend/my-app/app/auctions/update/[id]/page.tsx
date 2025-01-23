

import Headings from '@/app/components/Headings'
import React from 'react'
import FormOfAuctions from '../../FormOfAuctions'
import { getDetailView } from '@/app/actions/actionOfAuctions'

export default async function UpdateAuctions({params}: {params: {id: string}}) {
 
  
  const data = await getDetailView(params.id);
  
  return (
   <div className='mx-auto max-w-[50%] shadow-2xl p-20 bg-neutral-200 rounded-3xl'>
    <Headings title='Edytuj dane aukcji' />
    <FormOfAuctions auction={data}/>
   </div>
  )
}

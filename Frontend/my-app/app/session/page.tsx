import { auth } from '@/auth';

import React from 'react'
import TestAuth from './TestAuth';

export default async function Session() {
  const session=await auth();
  
    return (
    <div>
        
        <header title='Twoja sesja logowania'/>

      <div className='bg-blue-200 border-2 border-blue-500'>
        <h3 className='text-lg'>Dane sesji</h3>
        <pre className='whitespace-pre-wrap break-all'>{JSON.stringify(session, null, 2)}</pre>
      </div>
       
        <div className='mt-4'>
          <TestAuth/>
        </div>
        
        
    </div>
  )
}

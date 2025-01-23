'use client'


import React, { useState } from 'react'
import { auctionUpdateTesting } from '../actions/actionOfAuctions';
import { Button } from 'flowbite-react';




export default function TestAuth() {
 const [loading, setLoading] = useState(false);
 const [result, setResult]= useState<any>();
 


    function doUpdate(){
        setResult(undefined);
        setLoading(true);
        auctionUpdateTesting()
        .then(res=> setResult(res))
        .catch(err=>setResult(err))
        .finally(()=>setLoading(false))
    }
    return (
    <div className='flex- items-center gap-4'>
        <Button outline isProcessing={loading} onClick={doUpdate}>
            Test autoyzacji

        </Button>
        <div>
        {JSON.stringify(result, null, 2)}
        </div>
    </div>
  )
}

'use client'

import { deletingAuctions } from '@/app/actions/actionOfAuctions';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


type Props={
    id: string

}

export default function DeletingAuctionsButton({id}: Props) {
  const [load, setLoad]=useState(false);
  const router=useRouter();
  

function doDelete(){
        setLoad(true);
        deletingAuctions(id)
        .then(res=> {

            if(res.error) throw res.error;
            router.push('/');

        }).catch(error=>{
            toast.error(error.status + ' '+ error.message)
        }).finally(()=>setLoad(false))
}


    return (
    <Button color='failure' outline isProcessing={load} onClick={doDelete}>
            Usuń


    </Button>
  )
}

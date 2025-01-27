
'use client'

type Props=
{

    auctionId: string
    highBid: number

}



import { placeAuctionBids } from '@/app/actions/actionOfAuctions'
import { storeAuctionsBidsUsed } from '@/hooks/storeAuctionsBidsUsed'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function FormOfBids({auctionId, highBid}: Props) {
    const {register, handleSubmit, reset, formState: {errors}}=useForm();
    const addBid=storeAuctionsBidsUsed(state=>state.addAuctionBid);
 
    function onSubmit(data: FieldValues) {
        if(data.amount<=highBid)
            {
                reset();
                return toast.error("Oferta musi wynosić więcej niż największa bieżąca")
                
            }



        placeAuctionBids(auctionId, +data.amount).then(bid => {
          if(bid.error) throw bid.error;
          
            addBid(bid);
            reset();
         }).catch(err=>toast.error(err.message))
    }

    
    
    return (
    
    
    
    <form onSubmit={handleSubmit(onSubmit)}className='flex item-center border-1 rounded-full py-1'>

        <input type="number"
        {...register('amount')}
        className='text-sm text-gray-700'
        placeholder='Wyślij swoją ofertę:'
        />
    </form>

  


)


}

import React from 'react'

import CountdownTimer from './CountdownTimer'
import ImagesOfCars from './ImagesOfCars'
import { Auction } from '@/types'
import Link from 'next/link'
import AuctionCurrentBid from './AuctionCurrentBid'

//użycie typów z /types/index.ts w celu bezpieczensta przed pomyłkami by wykorzystywać typy generyczne
type Props={
    auction: Auction

}

export default function AuctionsCards({auction}: Props) { 
  return (
    //#oznacza że w kartę będzie można kliknąć
    <Link href={`/auctions/details/${auction.id}`} className='group'>
      
        <div className='shadow-2xl relative w-full bg-gray-200 aspect-video rounded-lg overfolw-hidden'>
           <ImagesOfCars imageUrl={auction.imageUrl}/>
                
         <div className='absolute bottom-0 left-0'>
         <CountdownTimer auctionEnd={auction.auctionEnd}/>

         </div>
         <div className='absolute  left-0'>
         <AuctionCurrentBid reservePrice={auction.reservePrice} amount={auction.currentHighBid}/>

         </div>
      
        </div>

        
       <div className="flex justify-between items-center mt-4">
          <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
          <p className='font-semibold text-sm'>{auction.year}</p>
       </div>
      
    </Link>
  )
}

import React from 'react'

import CountdownTimer from './CountdownTimer'
import ImagesOfCars from './ImagesOfCars'
import { Auction } from '@/types'

//użycie typów z /types/index.ts w celu bezpieczensta przed pomyłkami by wykorzystywać typy generyczne
type Props={
    auction: Auction

}

export default function AuctionsCards({auction}: Props) { 
  return (
    //#oznacza że w kartę będzie można kliknąć
    <a href="#" className='group'>
        //kontenery na aukcje
        <div className='relative w-full bg-gray-200 aspect-video rounded-lg overfolw-hidden'>
           <ImagesOfCars imageUrl={auction.imageUrl}/>
                
         <div className='absolute bottem-2 left-2'>
         <CountdownTimer auctionEnd={auction.auctionEnd}/>

         </div>
      
        </div>

        
       <div className="flex justify-between items-center mt-4">
          <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
          <p className='font-semibold text-sm'>{auction.year}</p>
       </div>
      
    </a>
  )
}


import { getDetailView } from '@/app/actions/actionOfAuctions'
import Headings from '@/app/components/Headings'
import React from 'react'
import CountdownTimer from '../../CountdownTimer'
import ImagesOfCars from '../../ImagesOfCars'
import EditButton from './EditButton'
import { getCurrentUser } from '@/app/actions/actionOfAuth'

import DetailsTable from './DetailsTable'
import DeletingAuctionsButton from './DeletingAuctionsButton'

export default async function DetailsOfAuction({params}: {params: {id: string} }) {
  
   const data = await getDetailView(params.id);
 
   const user = await getCurrentUser();
  
  return  (
  
   
   
    <div>

    
        <div className='flex justify-between '>
     
          <Headings title={`${data.make} ${data.model}`} />
           {user?.username===data.seller &&(
            <>
             <EditButton id={data.id}/>
             <DeletingAuctionsButton id={data.id}/>
            
            </>
         
           )}
          
         <div className='flex gap-4 '>
          <h3 className='text-2xl font-bold'>Pozostały czas do końca: </h3>
           <CountdownTimer auctionEnd={data.auctionEnd}/>
           </div>
          </div>

         <div className='grid grid-cols-2 gap-1 mt-6'>
           <div className='w-full bg-gray-200 relative aspect-[10/4] rounded-ss-full overflow-hidden'>
          <ImagesOfCars imageUrl={data.imageUrl}/>
          </div>
           <div className='border-5 p-2 bg-green-200 rounded-ee-full'>
             <Headings title='Oferty: '/>
          </div>
          </div>

         <div className='mt-6 grid grid-cols-2 rounded-lg'> 

           <DetailsTable auction={data}/>

         </div>

       </div>
  )
}
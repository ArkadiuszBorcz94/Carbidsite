import { Bid } from '@/types';
import { format } from 'date-fns';
import React from 'react';



type Props= {
    bid: Bid


}

export default function AuctionBidsItems({bid}: Props) {
  function getAuctionBidInfo(){
        let bgColor='';
        let text ='';
        switch (bid.bidStatus) {
            case 'Accepted':
            bgColor='bg-green-200'
            text='AcceptedBelowReserve'
            bgColor='bg-amber-100'
            text='Poniżej ceny maksymalnej '
            break;
            case 'TooLow':
            bgColor='bg-red-100'
             text='Poniżej ceny wywoławczej'
             break
             default:
                bgColor='bg-red-100'
                text='Po upłynieciu aukcji'
                    break;

        }
return{bgColor, text}
  }
  


    return (
        <div className={`w-9/12 border-gray-400 border-2 px-1 py-1 rounded-ee-full flex justify-between  items-center  mb-1 ${getAuctionBidInfo().bgColor}`}>


            <div className='flex flex-col '>

                <span className='font-semibold '> Licytujacy- {bid.bidder}   </span>
                    <span className='text-gray-600 font-semibold '>Godzina- {format (new Date( bid.bidTime), 'dd MMM yyyy h:mm:s')} </span>
            </div>

            <div className='flex flex-col text-right mr-10 '>
            <div className='text-xl font-bold '>${bid.amount}</div>
            <div className='flex flex-row items-center '> <span>{getAuctionBidInfo().text} </span> </div>

            </div>


        </div>


    )
}

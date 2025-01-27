import React from 'react'

type Props={

    amount?: number
    reservePrice: number


}


export default function AuctionCurrentBid({amount, reservePrice}: Props) {
 
 
 const text =amount ?   amount+' zł' : 'Brak ofert';
 const color =amount? amount> reservePrice ? 'bg-blue-600' :'bg-amber-600' : 'bg-purple-500'
    return (
    <div className={` text-white py-1 px-3 rounded-ss-3xl ${color}`}>
        {text}
            
            
        </div>
  )
}

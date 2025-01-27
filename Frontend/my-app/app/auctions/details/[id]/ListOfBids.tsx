'use client'

import { getAuctionBids } from '@/app/actions/actionOfAuctions'
import Headings from '@/app/components/Headings'
import { storeAuctionsBidsUsed } from '@/hooks/storeAuctionsBidsUsed'
import { Auction, Bid } from '@/types'
import { User } from 'next-auth'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AuctionBidsItems from './AuctionBidsItems'
import FormOfBids from './FormOfBids'

type Props=
{
    user: User | null
    auction: Auction


}

export default function ListOfBids({user, auction}: Props) 
{

const [load, setLoad]= useState(true);
const auctionBids=storeAuctionsBidsUsed(state=> state.bids);
const setAuctionBids=storeAuctionsBidsUsed(state=> state.setAuctionBids);

// zapętlone wyszkiwanie najwyższej oferty, zaczynając od zera

const highBid=auctionBids.reduce((previous, current)=>previous> current.amount? previous: current.amount,0)

    useEffect(() => {
        getAuctionBids(auction.id)
            .then((res: any) => {
                if (res.error) {
                    throw res.error
                }
                setAuctionBids(res as Bid[]);

            }).catch(err => {
                toast.error(err.message);

            }).finally(() => setLoad(false))

    },[auction.id,setLoad, setAuctionBids])
    if(load) return<span>Wczytuje oferty...</span>




    return (
        <div className=' border-1 border-black-500 p-1 bg-gray-300  rounded-ee-full'>

            <div className='py-1 px-1 bg-gray-300'>
                <div className='sticky- top-0 bg-gray-300 p-0'>
                    <Headings title='Najnowsze oferty: ' />
                </div>
            </div>

            <div className='rounded-3xl'>
            <FormOfBids auctionId={auction.id} highBid={highBid} />
            </div>







            {auctionBids.map(auctionBids =>
                <AuctionBidsItems key={auctionBids.id} bid={auctionBids} />
            )}
        </div>
    )
}

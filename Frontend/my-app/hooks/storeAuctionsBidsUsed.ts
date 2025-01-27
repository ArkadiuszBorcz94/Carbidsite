import {  Bid } from "@/types"
import { create } from "zustand"

type State=
{
    bids:Bid[]

}

type Actions=
{

    setAuctionBids: (bids: Bid[])=> void
    addAuctionBid: (bid: Bid)=> void
}


export const storeAuctionsBidsUsed = create<State & Actions>((set) =>
({
    bids: [],
    setAuctionBids: (bids: Bid[]) => { set(() => ({ bids })) },



    //funkcja dodająca tylko te oferty których jeszcze nie było
    addAuctionBid: (bid: Bid) => {
        set((state) => ({ bids: !state.bids.find(x => x.id === bid.id) ? [bid, ...state.bids] : [...state.bids] }))
    }

}))
import { Auction, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    auctions: Auction[]
    totalCount: number
 pageCount: number
}

type Actions = {
    setAuctionData: (data: PagedResult<Auction>) => void
    setAuctionCurrentPrice: (auctionId: string, amount: number) => void
}

const initialState: State = {
auctions: [],
    pageCount: 0,
    totalCount: 0
}

export const storeAuctionsUsed = create<State & Actions>((set) => ({ ...initialState,

    setAuctionData: (data: PagedResult<Auction>) => {
        set(() => ({
            auctions: data.results,
            totalCount: data.totalCount,
            pageCount: data.pageCount
        }))
    },

    setAuctionCurrentPrice: (auctionId: string, amount: number) => {
        set((state) => ({
            auctions: state.auctions.map((auction) => auction.id === auctionId ? {...auction, currentHighBid: amount} : auction)}))
    }
}))
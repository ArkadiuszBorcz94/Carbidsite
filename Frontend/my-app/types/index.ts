export type PagedResult<T>={
    results: T[],
    pageCount: number
    totalCount: number
}
// przetransformowane na język typescript z encji aukcji
export type Auction= {
    reservePrice: number
    seller: string
    winner?: string
    soldAmount: number
    currentHighBid: number
    createdAt: string
    updatedAt: string
    auctionEnd: string
    status: string
    make: string
    model: string
    year: number
    color: string
    milage: number
    imageUrl: string
    id: string
  }
  
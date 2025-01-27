'use server'

import { auth } from "@/auth";
import { wrapperOfFetches } from "@/library/wrapperOfFetches";
import { Auction, Bid, PagedResult } from "@/types";
import { wrap } from "module";
import { revalidatePath } from "next/cache";
import {  FieldValues } from "react-hook-form";




export async function getData(query: string): Promise<PagedResult<Auction>>{

return await wrapperOfFetches.get(`search${query}`)
}


  export async function auctionUpdateTesting(){

    const data={

      milage: Math.floor(Math.random()*10000)+1,
    
    }

    return await wrapperOfFetches.put('auctions/6a5011a1-fe1f-47df-9a32-b5346b289391', data);
  }

//metoda tworzenia aukcji
  export async function createAuction(data: FieldValues) {
    return await wrapperOfFetches.post('auctions', data);
  }


//metoda wyświetlania szczegółów aukcji
  export async function getDetailView(id:string): Promise<Auction> {
    return await wrapperOfFetches.get(`auctions/${id}`);
  }

  //metoda edycji aukcji revalidatePath forcuje strone do odświeżaenia właściwości w tabeli po zmianie
  export async function updateAuctions(data: FieldValues, id: string){
    const res= await wrapperOfFetches.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
  }

  export async function deletingAuctions(id: string){

    return await wrapperOfFetches.del(`auctions/${id}`);
  }


  export async function getAuctionBids(id: string): Promise<Bid[]>{

    return await wrapperOfFetches.get(`bids/${id}`);
  }

export async function placeAuctionBids(auctionId:string, amount: number) {
    return await wrapperOfFetches.post(`bids?auctionId=${auctionId}&amount=${amount}`, {})
}

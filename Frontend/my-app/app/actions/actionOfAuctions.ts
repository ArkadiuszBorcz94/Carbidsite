'use server'

import { auth } from "@/auth";
import { Auction, PagedResult } from "@/types";




export async function getData(query: string): Promise<PagedResult<Auction>>{

   const res=await fetch(`http:/localhost:6001/search${query}`);
    //const res=await fetch(`http:/localhost:6001/search?pageSize=${pageSize}`);
  
    if(!res.ok) throw new Error("Nie wydobyto danych")
      return res.json();
  
  
  }

  export async function auctionUpdateTesting(){

    const data={

      mileage: Math.floor(Math.random()*10000)+1

    }

    const session=await auth();

    const res =await fetch('http//localhost:6001/auctions' ,{
        method: 'PUT',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : 'Bearer ' + session?.accessToken


        },
        body: JSON.stringify(data)

    });

    if (!res.ok) return {status: res.status, message: res.statusText}
     
      return res.statusText;
    //return res.json();
  
  
  
  
  
    }
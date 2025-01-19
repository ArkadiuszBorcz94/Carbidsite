'use server'

import { Auction, PagedResult } from "@/types";




export async function getData(query: string): Promise<PagedResult<Auction>>{

   const res=await fetch(`http:/localhost:6001/search${query}`);
    //const res=await fetch(`http:/localhost:6001/search?pageSize=${pageSize}`);
  
    if(!res.ok) throw new Error("Nie wydobyto danych")
      return res.json();
  
  
  }
'use client'
import React, { useActionState, useEffect, useState } from 'react'
import AuctionsCards from './AuctionsCards';
import { Auction, PagedResult } from '@/types';
import PagginationInApp from '../components/PagginationInApp';
import { getData } from '../actions/actionOfAuctions';
import FiltersOfAuctions from './FiltersOfAuctions';
import { useParamsStore } from '@/hooks/storeParamsUsed';

import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import FilterOfEmptyPage from '../components/FilterOfEmptyPage';
import { storeAuctionsUsed } from '@/hooks/storeAuctionsUsed';




export default function Listings() {
  //zarządzanei stanami Zustand
 
    const [load, setload]= useState(true);
  const params = useParamsStore(useShallow(state => ({

    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner

  })));
  const data= storeAuctionsUsed(useShallow (state=> ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount
  })));


const setData =storeAuctionsUsed(state=> state.setAuctionData)

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params })


  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })

  }
  //stare podejście bez Zustan
  //const [auctions, setAuctions] = useState<Auction[]>([]);
  //const [pageCount, setPageCount ]= useState(0);
  // const [pageNumber, setPageNumber]= useState(1);
  //const [sizeOfPage, setSizeOfPage]=useState(4);

  //efekt gdy kopmonent listy  zostanie załadowany po raz pierwszy


  //za każdym razem gdy zmieni się numer strony efekt useEffect zostanie wywołany ponownie aa komponent zostanie wyrenderowany ponowniue
  useEffect(() => {
    getData(url).then(data => {
      setData(data);
      setload(false);

    })

  }, [url])

  if (load) return <h3>Wczytywanie...</h3>

  


  return (
    <>
      <FiltersOfAuctions />
      {data.totalCount === 0 ?
        (<FilterOfEmptyPage showReset />

        ) : (
          <>
            <div className=' grid grid-cols-4 gap-5'>
              {data.auctions.map(auction => (
                <AuctionsCards auction={auction} key={auction.id} />
              ))}

            </div>

            <div className='flex justify-center mt-4'>
              <PagginationInApp pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />

            </div>


          </>


        )}




    </>

  )
}

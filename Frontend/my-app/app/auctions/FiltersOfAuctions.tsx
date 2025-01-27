import { useParamsStore } from '@/hooks/storeParamsUsed';
import { Button } from 'flowbite-react';
import React from 'react'
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { RxLapTimer } from "react-icons/rx";
import { GrNewWindow } from "react-icons/gr";
import { GrStatusGood } from "react-icons/gr";
import { FaHourglassEnd, FaRegCalendarTimes } from 'react-icons/fa';

const buttonsSizeOfPage=[4,8,12];

const sortingButtons=[
  {
    label:'Alfabetycznie',
    icon: TiSortAlphabeticallyOutline,
    value: 'make'
  },
  {
    label:'Do końca',
    icon: RxLapTimer,
    value: "endingSoon"
  },

  {
    label:'Niedawne',
    icon: GrNewWindow,
    value: 'new'
  },
]

const filteringButtons=[
  {
    label:'Aktywne',
    icon: GrStatusGood,
    value: 'live'
  },
  {
    label:'Mniej niż 12h',
    icon: FaHourglassEnd,
    value: 'endingSoon'
  },

  {
    label:'Zakończono',
    icon: FaRegCalendarTimes,
    value: 'finished'
  },
]

export default function FiltersOfAuctions() {
 const pageSize=useParamsStore(state=>state.pageSize);
 const setParams=useParamsStore(state=> state.setParams);
 const orderBy=useParamsStore(state=> state.orderBy);
 const filterBy=useParamsStore(state=>state.filterBy);
 
 return (


    <div className='shadow-2xl flex justify-between items-center mb-4'>

      


        <div>
          <span className=' uppercase text-sm text-gray-950 mr-1'>Aukcje na stronie</span>
        <Button.Group>

        {buttonsSizeOfPage.map((value, i)=>(
        <Button key={i} 
            onClick={()=> setParams({pageSize: value})}
            color={`${pageSize=== value ? 'blue' : 'gray'}`}
            className='focus:ring-2'
        >
            {value}
        </Button>
        ))}

        </Button.Group>
</div>

<div >
      <span className='uppercase text-sm text-gray-950 mr-2'>Filtrowanie</span>
      <Button.Group >
      {filteringButtons.map(({label, icon: Icon, value})=>(
       <Button 
       key={value} 
       onClick={()=>setParams({filterBy: value})}
       color={`${filterBy===value ? 'blue' : 'gray'}`}
      
       >
    
          <Icon className='mr-1 h-4 w-4' />       
        {label}
       </Button>
      ))}
      </Button.Group>
      </div>





<div>
      <span className='uppercase text-sm text-gray-950 mr-2'>Sortowanie</span>
      <Button.Group>
      {sortingButtons.map(({label, icon: Icon, value})=>(
       <Button 
       key={value} 
       onClick={()=>setParams({orderBy: value})}
       color={`${orderBy===value ? 'blue' : 'gray'}`}
      
       >
    
          <Icon className='mr-1 h-4 w-4' />       
        {label}
       </Button>
      ))}
      </Button.Group>
      </div>

        </div>
  )
}

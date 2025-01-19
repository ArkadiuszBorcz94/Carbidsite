'use client';
import React, { useState } from 'react'
import Image from 'next/image'
type Props={
    imageUrl: string;
}

export default function ImagesOfCars({imageUrl}: Props) {
  const [isLoading, setLoading] =useState(true);
  
    return (
    <Image 
                       src={imageUrl}
                       //użycie tagu obrazu zamias obrazu
                       alt={'image of car'}
                       fill
                       priority
                       className={`
                            object-cover group-hover:opacity-75 rounded-3xl duration-700 ease-in-out
                       ${isLoading 
                        ? 'graysca blur-md scale-110': 
                        'grayscale-0 blur-0 scale-100' }
                        `}
                       sizes='(max-width: 768px) 200vw, (max-width: 1200px) 50vw, 25vw'
                       onLoad={()=> setLoading(false)}
                   />
  )
}

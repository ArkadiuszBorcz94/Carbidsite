'use client'

import React from 'react'
import Countdown, { zeroPad } from 'react-countdown';

type Props= {
    auctionEnd: string;

}

// Renderer callback with condition
// skopiowane i zmodydikowane z react countdown
const renderer = ({ days, hours, minutes, seconds, completed }: 
    {days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {

            return(
                 //zmiana kolorów w zależności od czasu jaki został do końca aukcji
                <div className={`
                   
                    border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
                    ${completed ? 'bg-red-600':(days ===0 && hours < 10) ? 'bg-amber-600': 'bg-green-600' } 
                
                
                `}>

                 
                    {completed ?(
                        <span>Zakończono aukcje</span>
                    ): (
                        <span suppressHydrationWarning={true}>
                            {zeroPad (days)}:{zeroPad (hours)}:{zeroPad (minutes)}:{zeroPad (seconds)}
                            
                        </span>

                    )}
                </div>
//jeśli aukcja dobiegłą końca wyświetla co wyżej


            )
  };



export default function CountdownTimer({auctionEnd}: Props) {
  return (
    <div>
       <Countdown date={auctionEnd} renderer={renderer}/>
        
        </div>
  )
}

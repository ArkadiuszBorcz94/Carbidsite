import React from 'react'

type Props={

        title: string
        subtitle: string
        center?: boolean

}


export default function Headings({title, subtitle, center}: Props) {
  return (


    <div className={center ? 'text-center' : 'test-start' }>
       
        <div className='text-2xl font-bold'>
            {title}


        </div>
        <div className='font-light text neutral- 500 mt-2'></div>
            {subtitle}
        </div>
  

)
}

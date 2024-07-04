"use client"
import React from 'react'

const layout = ({children }:{children : any}) => {
  return (
    <div className='h-screen w-full'>
        {children}
    </div>
  )
}

export default layout

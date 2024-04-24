'use client'
import React, { useEffect } from 'react'
import { sendmail } from '../../actions/server'
export default function page() {
    useEffect(()=>{
        sendmail();
        console.log('dONE')
    }, [])
  return (
    <div>
      
    </div>
  )
}

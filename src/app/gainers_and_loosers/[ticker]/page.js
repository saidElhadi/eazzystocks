'use client'

import React from 'react'


function page({ params }) {
    
    console.log(params.ticker)

  return (
    <div>page{params.ticker}</div>
  )
}

export default page
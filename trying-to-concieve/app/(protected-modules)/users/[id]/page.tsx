"use client"
import useAuth from '@/app/hooks/useAuth'
import React from 'react'

const page = () => {
  const {auth} = useAuth()

  return (
    <div>
      Welcome {auth.fullName}
    </div>
  )
}

export default page
'use client'
import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
function page() {
  const router = useRouter()
  

    const {user, logOut} = UserAuth()
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/login')
        }
      })
      return unsubscribe
    }, [])

  return (
    <div>logged in as {user?.uid}
    <br/>
    <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default page
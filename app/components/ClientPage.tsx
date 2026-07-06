"use client"

import React from 'react'
import Searchbar from './Searchbar'
import Sidebar from './Sidebar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firestore/firebase'
import { useBoundStore } from '../zustand/zustand'

export default function ClientPage({children = <></>}) {

  const setUser = useBoundStore((state:any) => state.setUser)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
      console.log(user)
    })
  },[])

  return (
    <div>
        <Searchbar />
        <Sidebar />
        {children}
    </div>
  )
}

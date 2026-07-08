"use client"

import React from 'react'
import Searchbar from './Searchbar'
import Sidebar from './Sidebar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firestore/firebase'
import { useBoundStore } from '../zustand/zustand'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default function ClientPage({children = <></>}) {

  const setUser = useBoundStore((state:any) => state.setUser)
  const lastUser:User = useBoundStore((state:any) => state.user)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getLastUser(user.email)
      }
    })
  },[])

  async function getLastUser(email:string|null) {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email","==",email))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
        const userRef:User = {
            password:snapshot.docs[0].data().password,
            email:snapshot.docs[0].data().email,
            savedBooks:snapshot.docs[0].data().savedBooks,
            finishedBooks:snapshot.docs[0].data().finishedBooks,
        }
        setUser(userRef)
    }
  }

  return (
    <div>
        <Searchbar />
        <Sidebar />
        {children}
    </div>
  )
}

"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import { useBoundStore } from '@/app/zustand/zustand'
import LoginBlocker from '@/app/components/LoginBlocker'

export default function page() {

  const {id} = useParams()
  const [book,setBook] = useState<Book>({} as Book)
  const [loaded,setLoaded] = useState(false)
  const user:User = useBoundStore((state:any) => state.user)

  useEffect(() => {
    getData()
  },[])

  async function getData() {
    setLoaded(false)
    const {data}:any = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
    setBook(data)
    setLoaded(true)
  }

  return (
    (loaded &&
    <div className='summary'>
      <div className="audio__book--summary" style={{fontSize:"16px"}}>
        <div className="audio__book--summary-title">
            <b>{book.title}</b>
        </div>
        {user.plan ? (
          <div className="audio__book--summary-text">
            {book.summary}
        </div>
        ) : (
          <LoginBlocker text={"Log in to your account to read and listen to the book"}/>
        )}
      </div>
      <AudioPlayer book={book}/>
    </div>
    )
  )
}

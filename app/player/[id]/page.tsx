"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'

export default function page() {

  const {id} = useParams()
  const [book,setBook] = useState<Book>({} as Book)
  const [loaded,setLoaded] = useState(false)

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
        <div className="audio__book--summary-text">
            {book.summary}
        </div>
      </div>
      <AudioPlayer book={book}/>
    </div>
    )
  )
}

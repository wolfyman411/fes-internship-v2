import React, { useEffect, useState } from 'react'
import BookDisplay from './BookDisplay'
import axios from 'axios'

export default function BooksDisplay({apiCall = ""}) {


  const [booksData,setBooksData] = useState<Book[]>({} as Book[])
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    getData()
  },[])

  async function getData() {
    setLoaded(false)
    const {data}:any = await axios.get(apiCall)
    setBooksData(data)
    setLoaded(true)
  }


  return (
    <div className='for-you__recommended--books'>
      {
        loaded ? (
            booksData.map((book:Book,index:any) => {
                return(<BookDisplay data={book} key={book.id}/>)
            })
        ) : (
            new Array(8).fill("_").map((book:any,index:any) => {
                return(<BookDisplay key={index}/>)
            })
        )
      }
    </div>
  )
}

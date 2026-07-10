import React, { useEffect, useState } from 'react'
import BookDisplay from './BookDisplay'
import axios from 'axios'
import { Book, getAudioDuration } from '../globals'

export default function BooksDisplay({apiCall = "", dataArray=[] as string[]}) {


  const [booksData,setBooksData] = useState<Book[]>({} as Book[])
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    if (apiCall != "") {
      getData()
    }
    else {
      getBooksData()
    }
  },[])

  async function getData() {
    setLoaded(false)
    const {data}:any = await axios.get(apiCall)

    // Add song duration to the book
    await Promise.all(
      data.map(async (e:Book) => {
        e.bookDuration = (await getAudioDuration(e.audioLink))
      })
    )

    setBooksData(data)
    setLoaded(true)
  }

  async function getBooksData() {
    setLoaded(false)
    let tempData = []
    for (let id of dataArray) {
      tempData.push(axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`))
    }

    const responses = await Promise.all(tempData)

    // Add song duration to the book
    const responseData = responses.map(response => response.data)

    await Promise.all(
      responseData.map(async (e:Book) => {
        e.bookDuration = (await getAudioDuration(e.audioLink))
      })
    )

    setBooksData(responseData)
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

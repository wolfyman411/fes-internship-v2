"use client"

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BooksDisplay from '../components/BooksDisplay'
import Link from 'next/link'

export default function page() {

  const [selectedBook,setSelectedBook] = useState<Book>({} as Book)
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    getSelected()
  },[])

  async function getSelected() {
    setLoaded(false)
    const {data}:any = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")

    const audioData = new Audio()
    audioData.src = data[0].audioLink
    audioData.preload = "metadata"

    await new Promise((resolve) => {
        audioData.addEventListener('loadedmetadata', resolve)
    })

    data[0].bookDuration = audioData.duration

    setSelectedBook(data[0])

    setLoaded(true)
  }

  function selectedBookHTML() {
    return(
      <>
        {/* AUDIO */}
        <Link className="selected__book" href={`/book/${selectedBook.id}`}>
          <div className="selected__book--sub-title">{selectedBook.subTitle}</div>
          <div className="selected__book--line"></div>
          <div className="selected__book--content">
            <figure className="book__image--wrapper" style={{height:"140px",width:"140px",minWidth:"140px"}}>
              <img className="book__image" src={selectedBook.imageLink} alt='book image'></img>
            </figure>
            <div className="selected__book--text">
              <div className="selected__book--title">{selectedBook.title}</div>
              <div className="selected__book--author">{selectedBook.author}</div>
              <div className="selected__book--duration-wrapper">
                <div className="selected__book--icon">
                  <FontAwesomeIcon icon={faPlayCircle}/>
                </div>
                <div className="selected__book--duration">{`${(Math.floor(parseFloat(selectedBook.bookDuration)/60))} mins ${(Math.floor(parseFloat(selectedBook.bookDuration)%60)).toString().padStart(2,"0")} secs`}</div>
              </div>
            </div>
          </div>
        </Link>
      </>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            {loaded ? selectedBookHTML() : null}
            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">We think you'll like these</div>
              <BooksDisplay apiCall={"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"}/>
            </div>
            <div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <BooksDisplay apiCall={"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

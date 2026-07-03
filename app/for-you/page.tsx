"use client"

import React, { useEffect, useState } from 'react'
import Searchbar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Image from 'next/image'

export default function page() {

  interface Book {
    id:string,
    author:string,
    title:string,
    subTitle:string,
    imageLink:string,
    audioLink:string,
    totalRating:number,
    averageRating:number,
    keyIdeas:number,
    type:string,
    status:string,
    subscriptionRequired:boolean,
    summary:string,
    tags:[string],
    bookDescription:string,
    authorDescription:string
  }

  const [selectedBook,setSelectedBook] = useState<Book>({} as Book)
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    getData()
  },[])

  async function getData() {
    setLoaded(false)
    const {data}:any = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
    setSelectedBook(data[0])
    setLoaded(true)
  }

  function selectedBookHTML() {
    return(
      <>
        {/* AUDIO */}
        <a className="selected__book">
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
                <div className="selected__book--duration">3 mins 20 secs</div>
              </div>
            </div>
          </div>
        </a>
      </>
    )
  }

  return (
    <>
    <Searchbar/>
    <Sidebar/>
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected just for you</div>
          {loaded ? selectedBookHTML() : null}
          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">We think you'll like these</div>
            <div className="for-you__recommended--books">

            </div>
          </div>
          <div>
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__sub--title">Browse those books</div>
            <div className="for-you__recommended--books">

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

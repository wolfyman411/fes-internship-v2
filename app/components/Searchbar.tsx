"use client"

import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useBoundStore } from '../zustand/zustand'
import Link from 'next/link'
import axios from 'axios'
import { Book, getAudioDuration, User } from '../globals'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default function Searchbar({toggleSidebar}) {

  const [searchText,setSearchText] = useState("")
  const [booksData,setBooksData] = useState([] as Book[])
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    if (searchText.length > 0) {
      getBooksData()
    }
  },[searchText])

  async function getBooksData() {
    setLoaded(false)
    const {data}:any = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchText}`)

    // Add song duration to the book
    await Promise.all(
      data.map(async (e:Book) => {
        e.bookDuration = (await getAudioDuration(e.audioLink))
      })
    )

    setTimeout(() => {
      setLoaded(true)
    },1000) // Small delay to prevent flickering

    setBooksData(data)
  }

  function clearSearch() {
    const searchBarHTML = document.querySelector(".search__input")
    searchBarHTML.value = ""

    setSearchText("")
  }

  function searchBookHTML(book:Book) {
    return (
      <Link href={`/book/${book.id}`} className="search__book--link">
        <figure className="book__image--wrapper" style={{height:"80px",width:"80px",minWidth:"80px"}}>
          <img className="book__image" src={book.imageLink} style={{display:"block"}}></img>
        </figure>
        <div>
          <div className="search__book--title">{book.title}</div>
          <div className="search__book--author">{book.author}</div>
          <div className="search__book--duration">
            <div className="recommended__book--details">
              <div className="recommended__book--icon">
                <FontAwesomeIcon icon={faClock}/>
              </div>
              <div className="recommended__book--details-text">{book.bookDuration}</div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  function searchBarHTML() {
    return (
      <div className="search__books--wrapper">
        {
          loaded ? (
              booksData.length > 0 ? (
                booksData.map((book:Book,index:any) => {
                  return(searchBookHTML(book))
                })
              ) : (
                <div>No books found</div>
              )
          ) : (
              new Array(5).fill("_").map((book:any,index:any) => {
                return(
                  <div className="skeleton" style={{width:"100%", height:"120px", marginTop:"12px"}}></div>
                )
              })
          )
        }
      </div>
    )
  }
  
  return (
    <div className='search__background'>
      <div className="search__wrapper">
        <div className="figure">
          <img/>
        </div>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input type="text" placeholder='Search for books' className='search__input' onChange={(e) => setSearchText(e.target.value)}/>
              <div className="search__icon">
                {(searchText.length > 0) ? (
                  <FontAwesomeIcon icon={faTimes} onClick={clearSearch}/>
                ) : (
                  <FontAwesomeIcon icon={faSearch}/>
                )}
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => toggleSidebar(false)}>
            <FontAwesomeIcon icon={faBars}/>
          </div>
        </div>
        {(searchText.length > 0) ? (
          searchBarHTML()
        ) : (
          null
        )}
      </div>
    </div>
  )
}

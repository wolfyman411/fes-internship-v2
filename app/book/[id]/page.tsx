"use client"

import { faClock, faLightbulb, faStar } from '@fortawesome/free-regular-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkFilled } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useBoundStore } from '@/app/zustand/zustand'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/app/firestore/firebase'
import Link from 'next/link'
import { Book, User } from '@/app/globals'

export default function page() {

  const {id} = useParams()
  const [book,setBook] = useState<Book>({} as Book)
  const [loaded,setLoaded] = useState(false)
  const [buttonPressed,setButtonPressed] = useState(0) // Update the page so that the add to library buttons actually changes

  const user:User = useBoundStore((state:any) => state.user)
  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)
  const router = useRouter()

  useEffect(() => {
    getData()
  },[])

  async function getData() {
    setLoaded(false)
    const {data}:any = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)

    const audioData = new Audio()
    audioData.src = data.audioLink
    audioData.preload = "metadata"

    await new Promise((resolve) => {
        audioData.addEventListener('loadedmetadata', resolve)
    })

    data.bookDuration = audioData.duration

    setBook(data)
    setLoaded(true)
  }

  function toggleBook() {

    setButtonPressed(buttonPressed + 1)

    const index:number|undefined = user.savedBooks.findIndex((e) => e === book.id)
    if (index !== -1) { // Remove from array
        user.savedBooks.splice(index,1)
    }
    else { // Add to array
        user.savedBooks.push(book.id)
    }

    // Update database
    setDoc(doc(db,"users",auth.currentUser?.uid), {
        savedBooks: user.savedBooks
    }, {merge:true})
  }

  function handleInput() {
    if (user.plan) {
        if (user.plan === "basic" && book.subscriptionRequired) {
            router.push(`/choose-plan`)
        }
        else {
            router.push(`/player/${id}`)
        }
    }
    else {
        toggleLogin()
    }
  }

  function bookHTML() {
    return (
        <>
            <div className="inner__book">
                <div className="inner-book__title">{`${book.title} ${book.subscriptionRequired && (!user.plan || user.plan === "basic") ? "(Premium)" : ""}`}</div>
                <div className="inner-book__author">{book.author}</div>
                <div className="inner-book__sub--title">{book.subTitle}</div>
                <div className="inner-book__wrapper">
                    <div className="inner-book__description--wrapper">
                        <div className="inner-book__description">
                            <div className="inner-book__icon">
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                            <div className="inner-book__text">{book.averageRating} ({book.totalRating} ratings)</div>
                        </div>
                        <div className="inner-book__description">
                            <div className="inner-book__icon">
                                <FontAwesomeIcon icon={faClock}/>
                            </div>
                            <div className="inner-book__text">{`${(Math.floor(parseFloat(book.bookDuration)/60)).toString().padStart(2,"0")}:${(Math.floor(parseFloat(book.bookDuration)%60)).toString().padStart(2,"0")}`}</div>
                        </div>
                        <div className="inner-book__description">
                            <div className="inner-book__icon">
                                <FontAwesomeIcon icon={faMicrophone}/>
                            </div>
                            <div className="inner-book__text">Audio & Text</div>
                        </div>
                        <div className="inner-book__description">
                            <div className="inner-book__icon">
                                <FontAwesomeIcon icon={faLightbulb}/>
                            </div>
                            <div className="inner-book__text">{book.keyIdeas} Key ideas</div>
                        </div>
                    </div>
                </div>
                <div className="inner-book__read--btn-wrapper">
                    <div onClick={() => {handleInput()}}>
                        <button className="inner-book__read--btn">
                            <div className="inner-book__read--icon">
                                <FontAwesomeIcon icon={faBookOpen}/>
                            </div>
                            <div className="inner-book__read--text">Read</div>
                        </button>
                    </div>
                    <div onClick={() => {handleInput()}}>
                        <button className="inner-book__read--btn">
                            <div className="inner-book__read--icon">
                                <FontAwesomeIcon icon={faMicrophone}/>
                            </div>
                            <div className="inner-book__read--text">Listen</div>
                        </button>
                    </div>
                </div>
                <div className="inner-book__bookmark" onClick={() => {user.plan ? toggleBook() : toggleLogin()}} key={buttonPressed}>
                    {user && user.savedBooks && user.savedBooks.includes(book.id) ? (
                        <>
                            <div className="inner-book__bookmark--icon">
                                <FontAwesomeIcon icon={faBookmarkFilled}/>
                            </div>
                            <div className="inner-book__bookmark-text">Saved in My Library</div>
                        </>
                    ) : (
                        <>
                            <div className="inner-book__bookmark--icon">
                                <FontAwesomeIcon icon={faBookmark}/>
                            </div>
                            <div className="inner-book__bookmark-text">Add title to My Library</div>
                        </>
                    )}
                </div>
                <div className="inner-book__secondary--title">What's it about?</div>
                <div className="inner-book__tags--wrapper">
                    {book.tags.map((e,i) => {
                        return(<div className="inner-book__tag" key={i}>{e}</div>)
                    })}
                </div>
                <div className="inner-book__book--description">{book.bookDescription}</div>
                <div className="inner-book__secondary--title">About the author</div>
                <div className="inner-book__author--description">{book.authorDescription}</div>
            </div>
            <div className="inner-book--img-wrapper">
                <figure className="book__image--wrapper" style={{height:"300px",width:"300px",minWidth:"300px"}}>
                    <img src={book.imageLink} alt="" className='book__image'/>
                </figure>
            </div>
        </>
    )
  }

  function skeletonHTML() {
    return (
        <>
            <div className="inner__book">
                <div className="inner-book__title">
                    <div className="skeleton" style={{height:"64px", width:"100%"}}></div>
                </div>
                <div className="inner-book__author">
                    <div className="skeleton" style={{height:"32px", width:"200px"}}></div>
                </div>
                <div className="inner-book__sub--title">
                    <div className="skeleton" style={{height:"32px", width:"400px"}}></div>
                </div>
                <div className="inner-book__wrapper">
                    <div className="skeleton" style={{height:"64px", width:"60%"}}></div>
                </div>
                <div className="inner-book__book--description">
                    <div className="skeleton" style={{height:"70vh", width:"100%"}}></div>
                </div>
            </div>
            <div className="inner-book--img-wrapper">
                <figure className="book__image--wrapper" style={{height:"300px",width:"300px",minWidth:"300px"}}>
                    <div className="skeleton" style={{height:"100%", width:"100%"}}></div>
                </figure>
            </div>
        </>
    )
  }

  return (
    <div className="row">
        <div className="container">
            <div className="inner__wrapper">
                {loaded ? bookHTML() : skeletonHTML()}
            </div>
        </div>
    </div>
  )
}

"use client"

import { faClock, faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { useBoundStore } from '../zustand/zustand'
import { width } from '@fortawesome/free-solid-svg-icons/faSearch'

export default function BookDisplay({data = {} as Book}) {

  const user = useBoundStore((state:any) => state.user)

  function bookHTML() {
    return (
    <Link href={`/book/${data.id}`} className="for-you__recommended--books-link">
        {data.subscriptionRequired && (!user.plan || user.plan === "basic") && <div className="book__pill book__pill--subscription-required">Premium</div>}
        <figure className="book__image--wrapper" style={{marginBottom:"8px"}}>
            <img src={data.imageLink} alt="" className="book__image" />
        </figure>
        <div className="recommended__book--title">{data.title}</div>
        <div className="recommended__book--author">{data.author}</div>
        <div className="recommended__book--sub-title">{data.subTitle}</div>
        <div className="recommended__book--details-wrapper">
            <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                    <FontAwesomeIcon icon={faClock}/>
                </div>
                <div className="recommended__book--details-text">{data.bookDuration}</div>
            </div>
            <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <div className="recommended__book--details-text">{data.averageRating}</div>
            </div>
        </div>
    </Link>
    )
  }

  function skeletonHTML() {
    return(
        <div>
            <figure className="book__image--wrapper" style={{marginBottom:"8px"}}>
                <div className="skeleton" style={{height:"100%"}}></div>
            </figure>
            <div className="recommended__book--title">
                <div className="skeleton" style={{height:"30px"}}></div>
            </div>
            <div className="recommended__book--author">
                <div className="skeleton" style={{height:"20px", width:"50%"}}></div>
            </div>
            <div className="recommended__book--sub-title">
                <div className="skeleton" style={{height:"16px"}}></div>
            </div>
            <div className="recommended__book--details-wrapper">
                <div className="recommended__book--details">
                    <div className="recommended__book--details-text"></div>
                </div>
                <div className="recommended__book--details">
                    <div className="recommended__book--details-text"></div>
                </div>
            </div>
        </div>
    )
  }

  return (
    (data.id ? bookHTML() : skeletonHTML())
  )
}

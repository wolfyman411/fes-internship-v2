import { faClock, faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function BookDisplay({data = {} as Book}) {
  return (
    <Link href={`/book/${data.id}`} className="for-you__recommended--books-link">
    {/* AUDIO */}
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
            <div className="recommended__book--details-text">0:00</div>
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

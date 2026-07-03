import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Review({name = "", review = <></>}) {
  return (
    <div className="review">
        <div className="review__header">
        <div className="review__name">{name}</div>
        <div className="review__stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
        </div>
        </div>
        <div className="review__body">
        {review}
        </div>
    </div>
  )
}

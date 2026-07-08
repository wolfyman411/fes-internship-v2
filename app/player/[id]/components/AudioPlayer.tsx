import { faPlay, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function AudioPlayer({book = {} as Book}) {
  return (
    <div className="audio__wrapper">
        <audio src={book.audioLink}/>
        <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
                <figure className="book__image--wrapper" style={{height:"48px", width:"48px", minWidth:"48px"}}>
                    <img className='book__image' src={book.imageLink} alt="book" style={{display:"block"}}/>
                </figure>
            </figure>
            <div className="audio__track--details-wrapper">
                <div className="audio__track--title">{book.title}</div>
                <div className="audio__track--author">{book.author}</div>
            </div>
        </div>
        <div className="audio__controls--wrapper">
            <div className="audio__controls">
                <button className="audio__controls--btn">
                    <FontAwesomeIcon icon={faRotateLeft}/>
                </button>
                <button className="audio__comntrols--btn audio__controls--btn-play">
                    <FontAwesomeIcon icon={faPlay}/>
                </button>
                <button className="audio__controls--btn">
                    <FontAwesomeIcon icon={faRotateRight}/>
                </button>
            </div>
        </div>
        <div className="audio__progress--wrapper">
            <div className="audio__time">00:00</div>
            <input type="range" className="audio__progress--bar" value={0} max={100} style={{background:"linear-gradient(to right, rgb(43, 217, 124) 0%, rgb(109, 120, 125) 0%)"}}/>
            <div className="audio__time">00:00</div>
        </div>
    </div>
  )
}

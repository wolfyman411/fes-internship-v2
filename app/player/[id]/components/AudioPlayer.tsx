"use client"

import { faPause, faPlay, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

export default function AudioPlayer({book = {} as Book}) {

  const [audio,setAudio] = useState(() => new Audio())
  const [audioPlaying,setAudioPlaying] = useState(true)
  const [loaded,setLoaded] = useState(false)
  const [animationFrame,setAnimationFrame] = useState(0)
  const currentTime = useRef(0)

  useEffect(() => {
    getAudio()
  },[])

  function timerCount() {

    const playElement:HTMLAudioElement|null = document.querySelector(".book__audio")

    currentTime.current = playElement?.currentTime || 0
    setAnimationFrame(requestAnimationFrame(timerCount))
  }


  async function getAudio() {
    setLoaded(false)
    const audioData = new Audio()
    audioData.src = book.audioLink
    audioData.preload = "metadata"

    await new Promise((resolve) => {
        audioData.addEventListener('loadedmetadata', resolve)
    })

    setAudio(audioData)
    setLoaded(true)
  }

  function toggleAudio() {
    const playElement:HTMLAudioElement|null = document.querySelector(".book__audio")

    setAudioPlaying(!audioPlaying)

    if (audioPlaying) {
        playElement?.play()
        setAnimationFrame(requestAnimationFrame(timerCount))
    }
    else {
        playElement?.pause()
        cancelAnimationFrame(animationFrame)
    }
  }

  function sliderMoved(value:string) {
    currentTime.current = audio.duration*parseFloat(value)
  }

  return (
    (loaded &&
    <div className="audio__wrapper">
        <audio src={book.audioLink} className='book__audio'/>
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
                <button className="audio__comntrols--btn audio__controls--btn-play" onClick={toggleAudio}>
                    {audioPlaying ? (
                        <FontAwesomeIcon icon={faPlay}/>
                    ) : (
                        <FontAwesomeIcon icon={faPause}/>
                    )}
                </button>
                <button className="audio__controls--btn">
                    <FontAwesomeIcon icon={faRotateRight}/>
                </button>
            </div>
        </div>
        <div className="audio__progress--wrapper">
            <div className="audio__time">{`${(Math.floor(currentTime.current/60)).toString().padStart(2,"0")}:${(Math.floor(currentTime.current%60)).toString().padStart(2,"0")}`}</div>
            <input type="range" className="audio__progress--bar" value={(currentTime.current/audio.duration)*100} onChange={(e) => sliderMoved(e.target.value)} max={100} style={{background:`linear-gradient(to right, rgb(43, 217, 124) ${(currentTime.current/audio.duration)*100}%, rgb(109, 120, 125) 0%)`}}/>
            <div className="audio__time">{`${(Math.floor(audio.duration/60)).toString().padStart(2,"0")}:${(Math.floor(audio.duration%60)).toString().padStart(2,"0")}`}</div>
        </div>
    </div>
    )
  )
}

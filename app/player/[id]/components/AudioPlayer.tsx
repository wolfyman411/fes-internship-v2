"use client"

import { auth, db } from '@/app/firestore/firebase'
import { useBoundStore } from '@/app/zustand/zustand'
import { faPause, faPlay, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'

export default function AudioPlayer({book = {} as Book}) {

  const [audio,setAudio] = useState(() => new Audio())
  const [audioPlaying,setAudioPlaying] = useState(true)
  const [loaded,setLoaded] = useState(false)
  const [animationFrame,setAnimationFrame] = useState(0)
  const currentTime = useRef(0)

  const user:User = useBoundStore((state:any) => state.user)

  useEffect(() => {
    getAudio()
  },[])

  // Add book to finished books
  function finishedBook() {

    if (!auth.currentUser) {
        return
    }

    const index:number|undefined = user.finishedBooks.findIndex((e) => e === book.id)
    if (index === -1) { // Add if not found
        user.finishedBooks.push(book.id)
    }
    else { // Return if found
        return
    }

    // Update database
    setDoc(doc(db,"users",auth.currentUser?.uid), {
        finishedBooks: user.finishedBooks
    }, {merge:true})
  }

  function timerCount() {

    const playElement:HTMLAudioElement|null = document.querySelector(".book__audio")

    // End handler
    if (playElement) {
        if (currentTime.current >= playElement.duration) {
            currentTime.current = 0
            playElement.currentTime = 0
            playElement?.pause()
            setAudioPlaying(false)
            finishedBook()
            cancelAnimationFrame(animationFrame)
        }
    }

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
    const playElement:HTMLAudioElement|null = document.querySelector(".book__audio")
    const ratio = audio.duration*(parseFloat(value)/100)

    if (playElement) {
        // Skip
        currentTime.current = ratio
        playElement.currentTime = currentTime.current
        setAnimationFrame(requestAnimationFrame(timerCount))
        cancelAnimationFrame(animationFrame)
    }
  }

  function skipTime(value:number) {
    const playElement:HTMLAudioElement|null = document.querySelector(".book__audio")

    currentTime.current += value

    // Clamp
    if (currentTime.current <= 0) {
        currentTime.current = 0
    }
    else if (currentTime.current > audio.duration) {
        currentTime.current = audio.duration
    }

    if (playElement) {
        // Skip
        playElement.currentTime = currentTime.current
    }

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
                    <FontAwesomeIcon icon={faRotateLeft} onClick={() => skipTime(-10)}/>
                </button>
                <button className="audio__comntrols--btn audio__controls--btn-play" onClick={toggleAudio}>
                    {audioPlaying ? (
                        <FontAwesomeIcon icon={faPlay}/>
                    ) : (
                        <FontAwesomeIcon icon={faPause}/>
                    )}
                </button>
                <button className="audio__controls--btn">
                    <FontAwesomeIcon icon={faRotateRight} onClick={() => skipTime(10)}/>
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

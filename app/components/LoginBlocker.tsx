import Image from 'next/image'
import React from 'react'
import logo from '../assets/login.png'
import { useBoundStore } from '../zustand/zustand'

export default function LoginBlocker({text = ""}) {

  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)

  return (
    <div className="settings__login--wrapper">
        <Image src={logo} alt="landing" />
        <div className="settings__login--text">{text}</div>
        <button className="btn settings__login--btn" onClick={() => {toggleLogin()}}>Login</button>
    </div>
  )
}

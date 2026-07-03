"use client"

import React from 'react'
import Image from 'next/image'
import logo from "../../assets/logo.png"
import { useBoundStore } from '../../zustand/zustand'

export default function Navbar() {

  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login" onClick={toggleLogin}>Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  )
}

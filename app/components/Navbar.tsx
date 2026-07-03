import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.png"

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login">Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  )
}

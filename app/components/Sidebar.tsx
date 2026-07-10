"use client"

import Image from 'next/image'
import React from 'react'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark, faPenToSquare, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useBoundStore } from '../zustand/zustand'
import { signOut } from 'firebase/auth'
import { auth } from '../firestore/firebase'
import { usePathname } from 'next/navigation'

export default function Sidebar() {

  const setUser = useBoundStore((state:any) => state.setUser)
  const user = useBoundStore((state:any) => state.user)
  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)
  const pathname = usePathname()

  const navStyle = () => {
    if (!pathname.startsWith("/player/")) {
      return {}
    }
    else {
      return {height:"calc(-140px + 100vh)"}
    }
  }

  function logout() {
    signOut(auth)
    const userRef:User = {
      password:"",
      email:"",
      savedBooks:[],
      finishedBooks:[],
      plan:"",
    }
    setUser(userRef)
  }

  return (
    <>
      <div className='sidebar sidebar--closed'>
        <div className="sidebar__logo">
          <Image src={logo} alt="logo"/>
        </div>
        <div className="sidebar__wrapper" style={navStyle()}>
          <div className="sidebar__top">
            <Link href="/for-you" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faHome}/>
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <Link href="/library" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faBookmark}/>
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faPenToSquare}/>
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faSearch}/>
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link href="/settings" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faGear}/>
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            <div className="sidebar__link--wrapper" onClick={() => {user.plan ? logout() : toggleLogin()}}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faRightFromBracket}/>
              </div>
              <div className="sidebar__link--text">
                {user.plan ? "Logout" : "Login"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__overlay sidebar__overlay--hidden"></div>
    </>
  )
}

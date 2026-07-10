"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark, faPenToSquare, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faA, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useBoundStore } from '../zustand/zustand'
import { signOut } from 'firebase/auth'
import { auth } from '../firestore/firebase'
import { usePathname } from 'next/navigation'
import { User } from '../globals'

export default function Sidebar({showSidebar = false, toggleSidebar = (toggle:boolean) => {}}) {

  const setUser = useBoundStore((state:any) => state.setUser)
  const user = useBoundStore((state:any) => state.user)
  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)
  const pathname = usePathname()

  // Adjust tab elements on address change
  useEffect(() => {
    changeActiveTabs()
  },[pathname])

  useEffect(() => {
    const sidebarHTML = document.querySelector(".sidebar")
    const sidebarOverlay = document.querySelector(".sidebar__overlay")
    if (showSidebar) {
      sidebarHTML?.classList.remove("sidebar--closed")
      sidebarHTML?.classList.add("sidebar--opened")

      sidebarOverlay?.classList.remove("sidebar__overlay--hidden")
    }
    else {
      sidebarHTML?.classList.remove("sidebar--opened")
      sidebarHTML?.classList.add("sidebar--closed")

      sidebarOverlay?.classList.add("sidebar__overlay--hidden")
    }
  },[showSidebar])

  const navStyle = () => {
    if (!pathname.startsWith("/player/")) {
      return {}
    }
    else {
      return {height:"calc(-140px + 100vh)"}
    }
  }

  function changeActiveTabs() {

    const linkLines = document.querySelectorAll(".sidebar__link--line")
    let index = -1

    // Reset all to default
    for (const item of linkLines) {
      item.classList.remove("active--tab")
    }

    // Specific page handling
    if (pathname === "/for-you") {
      index = 0
    } else if (pathname === "/library") {
      index = 1
    } else if (pathname === "/settings") {
      index = 4
    }

    linkLines[index]?.classList.add("active--tab")
  }

  // This only works on the player page
  function changeReadingFont(element:HTMLElement,size:string) {
    const getFontSizeHTMLs = document.querySelectorAll(".sidebar__font--size-icon")

    // Reset all
    for (const item of getFontSizeHTMLs) {
      item.classList.remove("sidebar__font--size-icon--active")
    }

    // Set the active one
    element.classList.add("sidebar__font--size-icon--active")

    // Change the reading size
    const bookSummary:HTMLElement|null = document.querySelector(".audio__book--summary")

    if (bookSummary) {
      bookSummary.style.fontSize = size
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
            <Link href="/for-you" className="sidebar__link--wrapper" onClick={() => toggleSidebar(true)}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faHome}/>
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <Link href="/library" className="sidebar__link--wrapper" onClick={() => toggleSidebar(true)}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faBookmark}/>
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faPenToSquare}/>
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faSearch}/>
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
            {pathname.startsWith("/player/") && (
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                <div className="sidebar__link--text sidebar__font--size-icon" onClick={(e) => changeReadingFont(e.currentTarget,"16px")}>
                  <div>Aa</div>
                </div>
                <div className="sidebar__link--text sidebar__font--size-icon" onClick={(e) => changeReadingFont(e.currentTarget,"18px")}>
                  <div>Aa</div>
                </div>
                <div className="sidebar__link--text sidebar__font--size-icon" onClick={(e) => changeReadingFont(e.currentTarget,"22px")}>
                  <div>Aa</div>
                </div>
                <div className="sidebar__link--text sidebar__font--size-icon" onClick={(e) => changeReadingFont(e.currentTarget,"26px")}>
                  <div>Aa</div>
                </div>
              </div>
            )}
          </div>
          <div className="sidebar__bottom">
            <Link href="/settings" className="sidebar__link--wrapper" onClick={() => toggleSidebar(true)}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faGear}/>
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
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
      <div className="sidebar__overlay sidebar__overlay--hidden" onClick={() => toggleSidebar(true)}></div>
    </>
  )
}

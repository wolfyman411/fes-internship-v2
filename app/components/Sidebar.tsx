import Image from 'next/image'
import React from 'react'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark, faPenToSquare, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <>
      <div className='sidebar sidebar--closed'>
        <div className="sidebar__logo">
          <Image src={logo} alt="logo"/>
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <a href="" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faHome}/>
              </div>
              <div className="sidebar__link--text">For you</div>
            </a>
            <a href="" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faBookmark}/>
              </div>
              <div className="sidebar__link--text">My Library</div>
            </a>
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
            <a href="" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faGear}/>
              </div>
              <div className="sidebar__link--text">Settings</div>
            </a>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FontAwesomeIcon icon={faRightFromBracket}/>
              </div>
              <div className="sidebar__link--text">Logout</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__overlay sidebar__overlay--hidden"></div>
    </>
  )
}

import React from 'react'
import Searchbar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export default function page() {
  return (
    <>
    <Searchbar/>
    <Sidebar/>
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected just for you</div>
          {/* AUDIO */}
          <a className="selected__book">
            <div className="selected__book--sub-title">How Constant Innovation Creates Radically Successful Businesses</div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="book__image--wrapper" style={{height:"140px",width:"140px",minWidth:"140px"}}></figure>
              <div className="selected__book--text">
                <div className="selected__book--title">The Lean Startup</div>
                <div className="selected__book--author">Eric Ries</div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <FontAwesomeIcon icon={faPlayCircle}/>
                  </div>
                  <div className="selected__book--duration">3 mins 20 secs</div>
                </div>
              </div>
            </div>
          </a>
          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">We think you'll like these</div>
            <div className="for-you__recommended--books">

            </div>
          </div>
          <div>
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__sub--title">Browse those books</div>
            <div className="for-you__recommended--books">

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

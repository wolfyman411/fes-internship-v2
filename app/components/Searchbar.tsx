"use client"

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useBoundStore } from '../zustand/zustand'

export default function Searchbar({toggleSidebar}) {

  const user:User = useBoundStore((state:any) => state.user)
  
  return (
    <div className='search__background'>
      <div className="search__wrapper">
        <div className="figure">
          <img/>
        </div>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input type="text" placeholder='Search for books' className='search__input'/>
              <div className="search__icon">
                <FontAwesomeIcon icon={faSearch}/>
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => toggleSidebar(false)}>
            <FontAwesomeIcon icon={faBars}/>
          </div>
        </div>
      </div>
    </div>
  )
}

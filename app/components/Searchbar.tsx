import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Searchbar() {
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
          <div className="sidebar__toggle--btn">
          </div>
        </div>
      </div>
    </div>
  )
}

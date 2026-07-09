"use client"

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BooksDisplay from '../components/BooksDisplay'
import { useBoundStore } from '../zustand/zustand'

export default function page() {

  const user:User = useBoundStore((state:any) => state.user)

  return (
    (user.savedBooks &&
    <>
    <div className="row">
      <div className="container">
        <div>
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">{user.savedBooks.length}
            {user.savedBooks.length > 1 ? " items" : " item"}
          </div>
          <BooksDisplay dataArray={user.savedBooks}/>
        </div>
        <div>
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">{user.finishedBooks.length}
            {user.finishedBooks.length > 1 ? " items" : " item"}
          </div>
          <BooksDisplay dataArray={user.finishedBooks}/>
        </div>
      </div>
    </div>
    </>
    )
  )
}

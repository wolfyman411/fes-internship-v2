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
            {user.savedBooks.length > 1 || user.savedBooks.length <= 0 ? " items" : " item"}
          </div>
          {user.savedBooks.length > 0 ? (
            <BooksDisplay dataArray={user.savedBooks}/>
          ) : (
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">Save your favorite books!</div>
              <div className="finished__books--sub-title">When you save a book, it will appear here.</div>
            </div>
          )}
        </div>
        <div>
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">{user.finishedBooks.length}
            {user.finishedBooks.length > 1 || user.finishedBooks.length <= 0  ? " items" : " item"}
          </div>
          {user.finishedBooks.length > 0 ? (
            <BooksDisplay dataArray={user.finishedBooks}/>
          ) : (
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">Done and dusted!</div>
              <div className="finished__books--sub-title">When you finish a book, you can find it here later.</div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
    )
  )
}

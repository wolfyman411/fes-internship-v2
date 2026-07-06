"use client"

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BooksDisplay from '../components/BooksDisplay'

export default function page() {

  return (
    <>
    <div className="row">
      <div className="container">
        <div>
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">0 items</div>
          <BooksDisplay apiCall={"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"}/>
        </div>
        <div>
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">0 items</div>
          <BooksDisplay apiCall={"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"}/>
        </div>
      </div>
    </div>
    </>
  )
}

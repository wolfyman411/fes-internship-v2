"use client"

import React from 'react'
import { useBoundStore } from '../zustand/zustand'

export default function page() {

  const user = useBoundStore((state:any) => state.user)

  return (
    <div className="container">
        <div className="row">
            <div className="section__title page__title">Settings</div>
            <div className="setting__content">
                <div className="settings__sub--title">Your Subscription Plan</div>
                <div className="settings__text">PLAN</div>
            </div>
            <div className="setting__content">
                <div className="settings__sub--title">Email</div>
                <div className="settings__text">{user.email}</div>
            </div>
        </div>
    </div>
  )
}

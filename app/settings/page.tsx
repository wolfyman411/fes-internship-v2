"use client"

import React from 'react'
import { useBoundStore } from '../zustand/zustand'
import Image from "next/image";
import logo from '../assets/login.png'

export default function page() {

  const user = useBoundStore((state:any) => state.user)
  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)

  return (
    <div className="container">
        <div className="row">
            <div className="section__title page__title">Settings</div>
            {user ? (
                <>
                    <div className="setting__content">
                        <div className="settings__sub--title">Your Subscription Plan</div>
                        <div className="settings__text">PLAN</div>
                    </div>
                    <div className="setting__content">
                        <div className="settings__sub--title">Email</div>
                        <div className="settings__text">{user.email}</div>
                    </div>
                </>
            ) : (
                <div className="settings__login--wrapper">
                    <Image src={logo} alt="landing" />
                    <div className="settings__login--text">Log in to your account to see your details.</div>
                    <button className="btn settings__login--btn" onClick={() => {toggleLogin()}}>Login</button>
                </div>
            )}
        </div>
    </div>
  )
}

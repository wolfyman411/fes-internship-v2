"use client"

import React from 'react'
import { useBoundStore } from '../zustand/zustand'
import LoginBlocker from '../components/LoginBlocker';
import Link from 'next/link';

export default function page() {

  const user = useBoundStore((state:any) => state.user)

  return (
    <div className="container">
        <div className="row">
            <div className="section__title page__title">Settings</div>
            {user ? (
                <>
                    <div className="setting__content">
                        <div className="settings__sub--title">Your Subscription Plan</div>
                        {user.premium ? (
                            <div className="settings__text">Premium</div>
                        ) : (
                            <>
                            <div className="settings__text">Basic</div>
                            <Link href={"/choose-plan"}>
                                <div className="btn settings__upgrade--btn">Upgrade to Premium</div>
                            </Link>
                            </>
                        )}
                    </div>
                    <div className="setting__content">
                        <div className="settings__sub--title">Email</div>
                        <div className="settings__text">{user.email}</div>
                    </div>
                </>
            ) : (
                <LoginBlocker text={"Log in to your account to see your details."}/>
            )}
        </div>
    </div>
  )
}

"use client"

import React from 'react'
import Image from "next/image";
import landingImage from "../assets/landing.png"
import { useBoundStore } from '../zustand/zustand'

export default function Landing() {

  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)

  return (
    <section id="landing">
        <div className="container">
        <div className="row">
            <div className="landing__wrapper">
            <div className="landing__content">
                <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
                </div>
                <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
                </div>
                <button className="btn home__cta--btn" onClick={() => {toggleLogin()}}>Login</button>
            </div>
            <figure className="landing__image--mask">
                <Image src={landingImage} alt="landing" />
            </figure>
            </div>
        </div>
        </div>
    </section>
  )
}

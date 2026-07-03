"use client"

import { faMicrophone, faFile, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

export default function Features() {

  const activeIndex = useRef(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex.current < 5) {
        activeIndex.current += 1
      }
      else {
        activeIndex.current = 0
      }
      // Change the displays
      const wrappers = document.querySelectorAll(".statistics__content--header")
      for (let wrapper of wrappers) {
        for (let i = 0; i < wrapper.children.length; i++) {
          // Remove the active element UNLESS the index is correct
          if (i !== activeIndex.current) {
            wrapper.children[i].classList.remove("statistics__heading--active")
          }
          else {
            wrapper.children[i].classList.add("statistics__heading--active")
          }
        }
      }
    }, 2000)

      return () => clearInterval(interval) // Stops when unmounted
  },[])


  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <div className="section__title">Understand books in few minutes</div>
          <div className="features__wrapper">
            <div className="features">
              <div className="features__icon">
                <FontAwesomeIcon icon={faFile} />
              </div>
              <div className="features__title">Read or listen</div>
              <div className="features__sub--title">
                Save time by getting the core ideas from the best books.
              </div>
            </div>
            <div className="features">
              <div className="features__icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div className="features__title">Find your next read</div>
              <div className="features__sub--title">
                Explore book lists and personalized recommendations.
              </div>
            </div>
            <div className="features">
              <div className="features__icon">
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
              <div className="features__title">Briefcasts</div>
              <div className="features__sub--title">
                Gain valuable insights from briefcasts
              </div>
            </div>
          </div>
          <div className="statistics__wrapper">
            <div className="statistics__content--header">
              <div className="statistics__heading statistics__heading--active">Enhance your knowledge</div>
              <div className="statistics__heading">Achieve greater success</div>
              <div className="statistics__heading">Improve your health</div>
              <div className="statistics__heading">
                Develop better parenting skills
              </div>
              <div className="statistics__heading">Increase happiness</div>
              <div className="statistics__heading">
                Be the best version of yourself!
              </div>
            </div>
            <div className="statistics__content--details">
              <div className="statistics__data">
                <div className="statistics__data--number">93%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>significantly increase</b> reading
                  frequency.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">96%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">90%</div>
                <div className="statistics__data--title">
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>
          <div className="statistics__wrapper">
            <div
              className="statistics__content--details statistics__content--details-second"
            >
              <div className="statistics__data">
                <div className="statistics__data--number">91%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>report feeling more productive</b>
                  after incorporating the service into their daily routine.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">94%</div>
                <div className="statistics__data--title">
                  of Summarist members have <b>noticed an improvement</b> in
                  their overall comprehension and retention of information.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">88%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>feel more informed</b> about current
                  events and industry trends since using the platform.
                </div>
              </div>
            </div>
            <div
              className="statistics__content--header statistics__content--header-second"
            >
              <div className="statistics__heading statistics__heading--active">Expand your learning</div>
              <div className="statistics__heading">Accomplish your goals</div>
              <div className="statistics__heading">Strengthen your vitality</div>
              <div className="statistics__heading">Become a better caregiver</div>
              <div className="statistics__heading">Improve your mood</div>
              <div className="statistics__heading">Maximize your abilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

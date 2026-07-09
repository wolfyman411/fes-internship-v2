"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import plan_img from '../assets/pricing-top.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faFile, faHandshake, faSeedling } from '@fortawesome/free-solid-svg-icons'
import Footer from '../home/components/Footer'

export default function page() {

  const [openedCard,setOpenedCard] = useState<HTMLElement>()
  const [plusSelected,setPlusSelected] = useState(true)

  useEffect(() => {
    handlePlanCards()
  },[plusSelected])

  function displayCard(element:HTMLElement) {

    // Check if equal
    if (openedCard === element) {
      handleCard(openedCard)
      setOpenedCard(undefined)
      return
    }

    handleCard(element)
    if (openedCard) {
      handleCard(openedCard)
    }
    setOpenedCard(element)
  }

  function handleCard(element:HTMLElement) {

    const mainElement = element.closest(".accordion__card")
    const chevronElement = mainElement?.querySelector(".accordion__icon")
    const collapseElement = mainElement?.querySelector(".collapse")

    // Toggle
    if (chevronElement?.classList.contains("accordion__icon--rotate")) { // Is open
      chevronElement.classList.remove("accordion__icon--rotate")
      collapseElement?.classList.remove("show")
    }
    else { // Is closed
      chevronElement?.classList.add("accordion__icon--rotate")
      collapseElement?.classList.add("show")
    }
  }

  function handlePlanCards() {

    const planElements = document.querySelectorAll(".plan__card")

    // Reset Items
    for (const item of planElements) {
      const planCardCircle = item.querySelector(".plan__card--circle")

      const planCardDot = planCardCircle?.querySelector(".plan__card--dot")
      if (planCardDot) {
        planCardCircle?.removeChild(planCardDot)
      }
      item.classList.remove("plan__card--active")
    }

    // First is plus, second is not
    const refItem = plusSelected ? planElements[0] : planElements[1]

    const planCardCircle = refItem.querySelector(".plan__card--circle")
    const planCardDot = document.createElement("div")

    planCardDot.className = "plan__card--dot"
    planCardCircle?.appendChild(planCardDot)
    refItem.classList.add("plan__card--active")
  }

  return (
    <div className='wrapper__full'>
      <div className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">Get unlimited access to many amazing books to read</div>
            <div className="plan__sub--title">Turn ordinary moments into amazing learning opportunities</div>
            <figure className="plan__img--mask">
              <Image src={plan_img} alt='plan'/>
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="plan__features--wrapper">
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FontAwesomeIcon icon={faFile}/>
                </figure>
                <div className="plan__features--text">
                  <b>Key ideas in a few minutes</b> with many books to read
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FontAwesomeIcon icon={faSeedling}/>
                </figure>
                <div className="plan__features--text">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FontAwesomeIcon icon={faHandshake}/>
                </figure>
                <div className="plan__features--text">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            <div className="plan__card" onClick={() => setPlusSelected(true)}>
              <div className="plan__card--circle">
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--text">7-day free trial included</div>
              </div>
            </div>
            <div className="plan__card--separator">
              <div className="plan__separator">or</div>
            </div>
            <div className="plan__card" onClick={() => setPlusSelected(false)}>
              <div className="plan__card--circle">
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Monthly</div>
                <div className="plan__card--price">$9.99/year</div>
                <div className="plan__card--text">No trial included</div>
            </div>
            </div>
            <div className="plan__card--cta">
              <span className="btn--wrapper">
                <button className="btn" style={{width:"300px"}}>
                  <span>{plusSelected ? "Start your free 7-day trial" : "Start your first month"}</span>
                </button>
              </span>
              <div className="plan__disclaimer">{plusSelected ? "Cancel your trial at any time before it ends, and you won't be charged." : "30-day money back guarantee, no questions asked."}</div>
            </div>
            <div className="faq__wrapper">
              <div className="accordion__card">
                <div className="accordion__header" onClick={(e) => displayCard(e.currentTarget)}>
                  <div className="accordion__title">How does the free 7-day trial work?</div>
                  <FontAwesomeIcon icon={faChevronDown} className='accordion__icon'/>
                </div>
                <div className="collapse">
                  <div className="accordion__body">
                    Begin your complimentary 7-day trial with a Summarist annual membership. 
                    You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. 
                    With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your 
                    subscription prior to the conclusion of the 7-day free trial.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header" onClick={(e) => displayCard(e.currentTarget)}>
                  <div className="accordion__title">Can I switch subscriptions from monthly to yearly, or yearly to monthly?</div>
                  <FontAwesomeIcon icon={faChevronDown} className='accordion__icon'/>
                </div>
                <div className="collapse">
                  <div className="accordion__body">
                    While an annual plan is active, it is not feasible to switch to a monthly plan. 
                    However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header" onClick={(e) => displayCard(e.currentTarget)}>
                  <div className="accordion__title">What's included in the Premium plan?</div>
                  <FontAwesomeIcon icon={faChevronDown} className='accordion__icon'/>
                </div>
                <div className="collapse">
                  <div className="accordion__body">
                    Premium membership provides you with the ultimate Summarist experience, 
                    including unrestricted entry to many best-selling books high-quality audio, 
                    the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header" onClick={(e) => displayCard(e.currentTarget)}>
                  <div className="accordion__title">Can I cancel during my trial or subscription?</div>
                  <FontAwesomeIcon icon={faChevronDown} className='accordion__icon'/>
                </div>
                <div className="collapse">
                  <div className="accordion__body">
                    You will not be charged if you cancel your trial before its conclusion. 
                    While you will not have complete access to the entire Summarist library, 
                    you can still expand your knowledge with one curated book per day.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

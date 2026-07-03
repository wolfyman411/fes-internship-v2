import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Review from './components/review'

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              <Review name={"Hanna M."} review={<>This app has been a <b>game-changer</b> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.</>}/>
              <Review name={"David B."} review={<>I love this app! It provides <b>concise and accurate summaries</b> of books in a way that is easy to understand. It's also very user-friendly and intuitive.</>}/>
              <Review name={"Nathan S."} review={<>This app is a great way to get the main takeaways from a book without having to read the entire thing. <b>The summaries are well-written and informative.</b> Definitely worth downloading.</>}/>
              <Review name={"Ryan R."} review={<>If you're a busy person who <b>loves reading but doesn't have the time</b> to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.</>}/>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn">Login</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

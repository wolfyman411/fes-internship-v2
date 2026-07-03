import React from 'react'
import Image from 'next/image'
import googleImg from "../assets/google.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMultiply, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  return (
    <div className="wrapper wrapper__full">
        <div className="sidebar__overlay sidebar__overlay--hidden"></div>
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content">
                    <div className="auth__title">Log in to Summarist</div>
                    <button className="btn guest__btn--wrapper">
                        <figure className="google__icon--mask guest__icon--mask">
                            <FontAwesomeIcon icon={faUser}/>
                        </figure>
                        <div>Login as a Guest</div>
                    </button>
                    <div className="auth__separator">
                        <div className="auth__separator--text">or</div>
                    </div>
                    <button className="btn google__btn--wrapper">
                        <figure className="google__icon--mask">
                            <Image src={googleImg} alt="google"/>
                        </figure>
                        <div>Login with Google</div>
                    </button>
                    <div className="auth__separator">
                        <div className="auth__separator--text">or</div>
                    </div>
                    <form action="" className="auth__main--form">
                        <input type="text" className="auth__main--input" typeof='text' placeholder='Email Address'/>
                        <input type="text" className="auth__main--input" typeof='password' placeholder='Password'/>
                        <button className="btn">
                            <span>Login</span>
                        </button>
                    </form>
                </div>
                <div className="auth__forgot--password">Forgot your password?</div>
                <button className="auth__switch--btn">Don't have an account?</button>
                <div className="auth__close--btn">
                    <FontAwesomeIcon icon={faMultiply}/>
                </div>
            </div>
        </div>
    </div>
  )
}

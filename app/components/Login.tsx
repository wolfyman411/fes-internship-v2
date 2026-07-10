"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import googleImg from "../assets/google.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMultiply, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'
import { useBoundStore } from '../zustand/zustand'
import Link from 'next/link'
import { app, auth, db, provider } from '../firestore/firebase'
import { getDoc, doc, collection, getDocs, where, query, addDoc, setDoc } from 'firebase/firestore'
import { usePathname, useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'
import { getPremiumStatus } from '../stripe/getPremiumStatus'

export default function Login() {

  const openAuth = useBoundStore((state:any) => state.loginOpen)
  const toggleLogin = useBoundStore((state:any) => state.toggleLogin)
  const setUser = useBoundStore((state:any) => state.setUser)
  const router = useRouter()
  const pathname = usePathname()

  const [pageState,setPageState] = useState(0) // 0: Log In, 1: Sign Up, 2: Password Reset
  const [formEmail,setFormEmail] = useState("")
  const [formPassword,setFormPassword] = useState("")
  const [authError,setAuthError] = useState("")
  const [authSuccess,setAuthSuccess] = useState("")
  const [loginState,setLoginState] = useState("") // Changes between Guest or Google when login pressed

  useEffect(() => {
    setPageState(0)
    setAuthError("")
  },[openAuth])

  useEffect(() => {
    setAuthError("")
  },[pageState])

  async function logInUser() {

    // Check information
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email","==",formEmail))
    const snapshot = await getDocs(q)

    // Check email
    if (!snapshot.empty) {
        
        const userRef:User = {
            password:snapshot.docs[0].data().password,
            email:snapshot.docs[0].data().email,
            savedBooks:snapshot.docs[0].data().savedBooks,
            finishedBooks:snapshot.docs[0].data().finishedBooks,
            plan:snapshot.docs[0].data().plan,
        }
        // Check password
        if (userRef.password === formPassword) {
            await signInWithEmailAndPassword(auth, userRef.email,userRef.password)

            handleLogin(userRef)
        }
        else {
            setAuthError("Incorrect Password.")
        }
    }

    // Else throw an error
    else {
        setAuthError("That user doesn't exist.")
    }
  }

  async function logInGoogle() {
    setLoginState("google")
    signInWithPopup(auth,provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let userRef:User = {
                password:"",
                email:"",
                savedBooks:[],
                finishedBooks:[],
                plan:"basic",
            }

            // Sign In
            if (docSnap.exists()) {

                const data = docSnap.data()
                userRef = {
                    password:data.password,
                    email:data.email,
                    savedBooks:data.savedBooks,
                    finishedBooks:data.finishedBooks,
                    plan:data.plan,
                }
            }

            // Sign Up
            else if (user.email) {
                userRef.email = user.email

                const userDocRef = doc(db, "users", user.uid)
                await setDoc(userDocRef, userRef)
            }

            handleLogin(userRef)

        }).catch((e) => {
            const credential = GoogleAuthProvider.credentialFromError(e);
            setAuthError("Google log in failed")
            setLoginState("")
        })
  }

  async function signUpUser() {

    // Check information
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email","==",formEmail))
    const snapshot = await getDocs(q)

    // Throw error if email already exists
    if (!snapshot.empty) {
        setAuthError("A user already has that email.")
    }

    // Else throw an error
    else {
        // Email doesn't work
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(formEmail)) {
            setAuthError("Invalid email address.")
        }

        // Password isn't 6 or more
        else if (formPassword.length < 6) {
            setAuthError("Password length must be 6 or more characters.")
        }

        // Success
        else {
            const userRef:User = {
                password:formPassword,
                email:formEmail,
                savedBooks:[],
                finishedBooks:[],
                plan:"basic",
            }

            await createUserWithEmailAndPassword(auth, userRef.email,userRef.password)
            if (auth.currentUser) {
                const userDocRef = doc(db, "users", auth.currentUser.uid)
                await setDoc(userDocRef, userRef)
            }

            handleLogin(userRef)
        }
    }

  }

  async function signInGuest() {

    setLoginState("guest")

    const docRef = doc(db, "users", "hy42gbx8vke5yHRlqzujc318Z8t1"); //HARD CODED GUEST ID
    const docSnap = await getDoc(docRef);

    const data = docSnap.data()
    if (data) {
        const userRef = {
            password:data.password,
            email:data.email,
            savedBooks:data.savedBooks,
            finishedBooks:data.finishedBooks,
            plan:data.plan,
        }

        await signInWithEmailAndPassword(auth, data.email,data.password)

        handleLogin(userRef)
    }
  }

  async function sendResetPassword() {
    
    // Check information
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email","==",formEmail))
    const snapshot = await getDocs(q)

    // Check email
    if (!snapshot.empty) {
        sendPasswordResetEmail(auth,formEmail)
        setAuthSuccess("Your reset email has been sent!")
    }
  }
  
  async function handleLogin(userRef:User) {

    // Check premium status
    const newPremiumStatus = auth.currentUser ? await getPremiumStatus(app) : "basic"
    userRef.plan = newPremiumStatus

    setUser(userRef)
    toggleLogin()

    if (pathname === "/") {
        router.push("/for-you")
    }
  }

  function resetHTML() {
    return (
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content">
                    <div className="auth__title">Reset your password</div>
                    <div className="auth__error">{authError}</div>
                    <div className="auth__success">{authSuccess}</div>
                    <div className="auth__main--form" onClick={() => {sendResetPassword()}}>
                        <input type="text" className="auth__main--input" placeholder='Email Address' autoComplete='current-email' onChange={(e) => setFormEmail(e.target.value)}/>
                        <button className="btn">
                            <span>Send reset password link</span>
                        </button>
                    </div>
                </div>
                <button className="auth__switch--btn" onClick={() => {setPageState(0)}}>Go to login</button>
            </div>
            <div className="auth__close--btn" onClick={() => {toggleLogin()}}>
                <FontAwesomeIcon icon={faMultiply}/>
            </div>
        </div>
    )
  }

  function loginHTML() {
    return (
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content">
                    <div className="auth__title">Log in to Summarist</div>
                    <div className="auth__error">{authError}</div>
                    <button className="btn guest__btn--wrapper" onClick={() => {signInGuest()}}>
                        {loginState === "guest" ? (
                            <FontAwesomeIcon icon={faSpinner}/>
                        ) : (
                            <>
                            <figure className="google__icon--mask guest__icon--mask">
                                <FontAwesomeIcon icon={faUser}/>
                            </figure>
                            <div>Login as a Guest</div>
                            </>
                        )}
                    </button>
                    <div className="auth__separator">
                        <div className="auth__separator--text">or</div>
                    </div>
                    <button className="btn google__btn--wrapper" onClick={() => {logInGoogle()}}>
                        {loginState === "google" ? (
                            <FontAwesomeIcon icon={faSpinner}/>
                        ) : (
                            <>
                            <figure className="google__icon--mask">
                                <Image src={googleImg} alt="google"/>
                            </figure>
                            <div>Login with Google</div>
                            </>
                        )}
                    </button>
                    <div className="auth__separator">
                        <div className="auth__separator--text">or</div>
                    </div>
                    <div className="auth__main--form">
                        <input type="text" className="auth__main--input" placeholder='Email Address' autoComplete='current-email' onChange={(e) => setFormEmail(e.target.value)}/>
                        <input type="password" className="auth__main--input" placeholder='Password' autoComplete='current-password' onChange={(e) => setFormPassword(e.target.value)}/>
                        <button className="btn"  onClick={() => {logInUser()}}>
                            <span>Login</span>
                        </button>
                    </div>
                </div>
                <div className="auth__forgot--password" onClick={() => {setPageState(2)}}>Forgot your password?</div>
                <button className="auth__switch--btn" onClick={() => {setPageState(1)}}>Don't have an account?</button>
                <div className="auth__close--btn" onClick={() => {toggleLogin()}}>
                    <FontAwesomeIcon icon={faMultiply}/>
                </div>
            </div>
        </div>
    )
  }

  function signupHTML() {
    return (
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content">
                    <div className="auth__title">Sign up to Summarist</div>
                    <div className="auth__error">{authError}</div>
                    <button className="btn google__btn--wrapper" onClick={() => {logInGoogle()}}>
                        {loginState === "google" ? (
                            <FontAwesomeIcon icon={faSpinner}/>
                        ) : (
                            <>
                            <figure className="google__icon--mask">
                                <Image src={googleImg} alt="google"/>
                            </figure>
                            <div>Sign up with Google</div>
                            </>
                        )}
                    </button>
                    <div className="auth__separator">
                        <div className="auth__separator--text">or</div>
                    </div>
                    <div className="auth__main--form">
                        <input type="text" className="auth__main--input" placeholder='Email Address' autoComplete='current-email' onChange={(e) => setFormEmail(e.target.value)}/>
                        <input type="password" className="auth__main--input" placeholder='Password' autoComplete='current-password' onChange={(e) => setFormPassword(e.target.value)}/>
                        <button className="btn" onClick={() => signUpUser()}>
                            <span>Sign up</span>
                        </button>
                    </div>
                </div>
                <button className="auth__switch--btn" onClick={() => {setPageState(0)}}>Already have an account?</button>
                <div className="auth__close--btn" onClick={() => {toggleLogin()}}>
                    <FontAwesomeIcon icon={faMultiply}/>
                </div>
            </div>
        </div>
    )
  }

  if (openAuth) {
    if (pageState === 0) {
        return(loginHTML())
    }
    else if (pageState === 1) {
        return(signupHTML())
    }
    else {
        return(resetHTML())
    }
  }
}

import React, { useState, useRef } from 'react';
import Header from './Header';
import checkValidData from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import {addUser} from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Login = () => {
    const [isSignIn, setIsSignInFrom] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInFrom(!isSignIn);
    };

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignIn) {
            // Sign Up logic
            createUserWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        // photoUrl: "https://example.com/your-photo-url.jpg"
                    })
                    .then(() => {
                      const{uid,email,displayName,photoUrl} = auth.currentUser;
                      dispatch(
                        addUser({
                          uid,email,displayName,photoUrl
                        })
                      );

                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        } else {
            // Sign In logic
            signInWithEmailAndPassword(
              auth, 
              email.current.value,
              password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        }
    };

    return (
        <div>
            <Header />

            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg" alt="img" />
            </div>

            <form onSubmit={e => e.preventDefault()} className='w-3/12 absolute px-12 py-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>

                {!isSignIn && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className='p-4 my-4 w-full bg-gray-800 bg-opacity-50 rounded-lg'
                    />
                )}

                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className='p-4 my-4 w-full bg-gray-800 bg-opacity-50 rounded-lg'
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className='p-4 my-4 w-full bg-gray-800 bg-opacity-50 rounded-lg'
                />

                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

                <button
                    className='p-4 my-4 bg-red-700 w-full rounded-lg'
                    onClick={handleButtonClick}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>

                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                    {isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In now"}
                </p>
            </form>
        </div>
    );
};

export default Login;

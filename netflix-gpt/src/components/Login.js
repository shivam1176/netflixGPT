import React, { useState,useRef } from 'react'
import Header from './Header'
import checkValidData from '../utils/validate';
const Login = () => {
    const [isSignIn, setIsSignInFrom] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);



    const email =useRef(null);
    const password =useRef(null);


    const toggleSignInForm=()=>{
        setIsSignInFrom(!isSignIn);
    };

    const handleButtonClick=()=>{
        // validate the form data 
      const message =  checkValidData(email.current.value,password.current.value) ;
      
      setErrorMessage(message);
    }
  return (
    <div >
        <Header/>

        <div className='absolute '>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg" alt="img"/>
        </div>

        <form onSubmit={e=>e.preventDefault()} className=' w-3/12 absolute px-12 py-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{ isSignIn? "Sign In" :"Sign Up"}</h1>
            
            {!isSignIn &&( <input type=" full name" 
            placeholder=" Full Name" 
            className='p-4 my-4 w-full  bg-gray-800 bg-opacity-50 rounded-lg'/>
           )}

            <input ref={email} type="text" 
            placeholder="email address" 
            className='p-4 my-4 w-full bg-gray-800 bg-opacity-50 rounded-lg'/>

           
            <input ref={password} type="Password" 
            placeholder="Password" 
            className='p-4 my-4 w-full  bg-gray-800 bg-opacity-50 rounded-lg'/>

            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

            <button 
            className='p-4 my-4  bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
               { isSignIn? "Sign In" :"Sign Up"} 
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            { isSignIn ? "  New to Netflix ? Sign Up Now " :"Already registered? Sign In now"}
            
            </p>
        
        </form>

    </div>

  
  )
}

export default Login

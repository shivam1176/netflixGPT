import React from 'react';
import Login from './Login';
import Browse from './Browse';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "../utils/firebase";
import { useEffect } from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
const Body = () => {
  const dispatch = useDispatch();
 
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>

        },
    ]);
    useEffect(()=>{
              const auth = getAuth();
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  const {uid,email,displayName,photoUrl} = user;
                  dispatch(addUser({uid,email,displayName,photoUrl}));
                
                  
                } else {
                  // User is signed out
                  // ..
                  dispatch(removeUser());

                
                }
              });

    },[])

  return (
    <div>
       <RouterProvider router={appRouter}/>
      
    </div>
  )
}

export default Body

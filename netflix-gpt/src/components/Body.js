import React from 'react';
import Login from './Login';
import Browse from './Browse';

// import { getAuth } from "../utils/firebase";

import {createBrowserRouter,RouterProvider} from 'react-router-dom';


const Body = () => {
  
 
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
   

  return (
    <div>
       <RouterProvider router={appRouter}/>
      
    </div>
  )
}

export default Body

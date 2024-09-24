import React,{ useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constant';
import { UserAvatar } from '../utils/constant';
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store =>store.user)
 
  const handleSignOut=()=>{
        const auth = getAuth();
        signOut(auth)
      .then(() => {
        // Sign-out successful
      })
      .catch((error) => {
        navigate("/error"); 
        // An error happened.
      });
  };

  const dispatch = useDispatch();

  useEffect(()=>{
    const auth = getAuth();
    const  unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoUrl} = user;
        dispatch(addUser({uid,email,displayName,photoUrl}));      
        navigate('/browse');
        
      } 
      else {
        dispatch(removeUser());
        navigate("/");      
      }
    });
    return ()=> unsubscribe();
},[])


  return (
    <div className='   absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img  className="w-44" src={LOGO}
          alt="netfix logo"/>
      {user &&
      (<div className="flex ">
          <img className='w-1/4' 
          src= {UserAvatar}
            // src={user.photoUrl}
            alt="logo"/>
          <button onClick={handleSignOut} className='text-white font-bold p-4'>{`Sign out`}</button>
        </div>
     )}
    </div>
  )
}

export default Header

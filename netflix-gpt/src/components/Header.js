import React,{ useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

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
    onAuthStateChanged(auth, (user) => {
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
},[])


  return (
    <div className='   absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img  className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="netfix logo"/>
      {user &&
      (<div className="flex ">
          <img className='w-1/4' 
            src="https://occ-0-2991-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABSGQnHoC1SO4fqLsgu5rGiVDFLZiL8yzleR9R6x1AxN3QxkRRfGuprQxvYm01i-EoJbb_QFdlXlEGoltctDvel_R9UPpf1Bu9w.png?r=3e2" 
            // src={user.photoUrl}
            alt="logo"/>
          <button onClick={handleSignOut} className='text-white font-bold p-4'>{`Sign out`}</button>
        </div>
     )}
    </div>
  )
}

export default Header

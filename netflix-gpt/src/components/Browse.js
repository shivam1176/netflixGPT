import React,{useEffect} from 'react'
import Header from './Header'
import { API_options } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';


const Browse = () => {
  const dispatch = useDispatch();
  const getNowPayingMovies = async()=>{
  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',API_options)

  const json = await data.json();
  console.log(json.results);
  dispatch(addNowPlayingMovies(json.results));
};
useEffect(()=>{
  getNowPayingMovies();
},[])
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse

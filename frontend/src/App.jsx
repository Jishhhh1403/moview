

import { useEffect, useState} from "react";
import { Header } from "./components/Header"
import { Homepage } from "./components/Homepage"
import { Search } from "./components/Search"
import { MovieCard } from "./components/MovieCard"
import  useDebounce  from "./Hooks/useDeb";

const App=()=>{
  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
  
  const [searchTerm,setSearchTerm]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [movieList,setMovieList]=useState([])
  const [watchList,setWatchList]=useState([])

  const newdebouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const fetchpopularMovies=async (query='')=>{
    setIsLoading(true)
    try{
      const endpoint=query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/movie/popular?language=en-US&page=1`
      const response=await fetch(endpoint,API_OPTIONS)
      const data=await response.json()
      setMovieList(data.results||[])
    }catch(error){
      console.log("error while getting pouplar movies")
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    fetchpopularMovies(newdebouncedSearchTerm)
  },[newdebouncedSearchTerm])
  return(
    <div className="min-h-screen bg-gray-800 text-white">
        <div >
          <Header/>
        </div>
        <div>
          <Homepage/>
        </div>
        <div>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className=" pl-16 mt-8 text-2xl font-bold text-white">
          <b>MOVIES</b>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    </div>
  )
}

export default App
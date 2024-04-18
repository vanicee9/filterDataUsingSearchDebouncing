'use client'
import { useEffect } from "react";
import { useState } from "react";
import './styles/styles.scss'
export default function Home() {
  const[originalData, setOriginalData] = useState([]); // db
  const [movieData, setMovieData] = useState([]);
  const [query, setQuery] = useState('');
    useEffect(()=>{
      async function getMovies(){
      let response = await fetch('https://api.sampleapis.com/movies/classic');
      response = await response.json();
      console.log(response);
      setMovieData(response)
      setOriginalData(response)
    }
    getMovies();
    },[])
  

    function handleChange(event){
      event.preventDefault();
      const value = event.target.value;
      setQuery(value)
      const filterResult =  movieData.filter((item)=>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
      setMovieData(filterResult)
      setMovieData(value === "" ? originalData : filterResult);

    }
  return (
      <div className = "container">
      <div id = "searchBar">
        <input type="text" placeholder="Search your movie" name = "movie" value={query} onChange={handleChange} />
        
      </div>
      <div id='movies-card-container'>
        {movieData.map((item, index)=>{
          return(
            <div key = {index}><img src={item.posterURL}/>
                {item.title}</div>
          )
        })}
      </div>

      </div>
  );
}

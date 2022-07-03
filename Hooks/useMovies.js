import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3/movie/popular?api_key=";
const API_KEY = "81c613b4c91f91a2ae895c2693e7c8b0";
const language = "fr-FR";

const MoviesContext = React.createContext();
export const useMovies = () => useContext(MoviesContext);

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  // console.log("----------------MOVIES---------------------");
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?api_key=81c613b4c91f91a2ae895c2693e7c8b0&language=fr-FR&page=1")
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}

export default MoviesProvider;
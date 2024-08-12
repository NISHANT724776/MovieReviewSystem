
import './App.css';
import api from './api/axiosConfig';
import React, { useState, useEffect } from 'react';
import Layout from './Component/layout';
import Home from './Component/home/Home';
import Trailer from './Component/trailer/Trailer';
import Reviews from './Component/reviews/Reviews';
import NotFound from './Component/notFound/NotFound';
import {Routes, Route} from 'react-router-dom'
import Hero from './Component/hero/Hero';
import Header from './Component/header/Header';
import WatchList from './Component/header/WatchList';
import MovieDetail from './Component/header/MovieDetail';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [movies, setMovies] = useState();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (authenticated) {
      getMovies();
    }
  }, [authenticated]);
 
  const getMovies = async () =>{
    
    try
    {
      const response = await api.get("/api/v1/movies");
      
      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  };
  
  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  };
  const getMovieTitle = async (searchInput) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/title/${searchInput}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  };
  
   
  useEffect(() => {
    getMovies();
    setMovies();
    fetch('http://localhost:8080/api/v1/movies')
      .then(response => response.json())
      .then(data => {
        console.log(data[0].poster); // Print movies object to console
        setMovies(data);
        
      })
      .catch(error => console.error('Error fetching movies:', error));
  },[]);

  const handleSearch = (searchResults) => {
    setFilteredMovies(searchResults);
    setMovies(searchResults); // Update the main movies list
};

  


  // return (
    
  //   <div className="App">
  //     <Header onSearch={handleSearch} setAuthenticated={setAuthenticated} />
  //     <Routes>      
  //       <Route exact path="/" element={<Layout />}>
  //         <Route exact path="/watchList" element={<WatchList movies={filteredMovies.length ? filteredMovies : movies} />} />
  //         {/* <Route path="watchList" element={<WatchList />} /> */}
  //         <Route exact path="/watchList" element={<WatchList movies={movie} />} />
  //         {/* <Route path="/movie/:id" element={<MovieDetail movies={movie} />} /> */}
  //         {/* <Route path="/" element={<Home movies={movies} />} ></Route> */}
  //         <Route exact path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
  //         <Route exact path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
  //         <Route exact path="*" element = {<NotFound/>}></Route>             
  //       </Route>
  //     </Routes>
  //     <div>
  //       {/* <Hero movies={movies}/> */}
  //       <Hero movies={filteredMovies.length ? filteredMovies : movies} />
        
  //     </div>
  //   </div>
    
  // );
  return (
    <div className="App">
      {/* {authenticated ? (
        <> */}
          <Header onSearch={handleSearch} setAuthenticated={setAuthenticated} />
          <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route exact path="/watchList" element={<WatchList movies={filteredMovies.length ? filteredMovies : movies} />} />
              <Route exact path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
              <Route exact path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
              <Route exact path="*" element = {<NotFound/>}></Route>
            </Route>
          </Routes>
          <Hero movies={filteredMovies.length ? filteredMovies : movies} />
        {/* </>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )} */}
    </div>
  );
}

export default App;

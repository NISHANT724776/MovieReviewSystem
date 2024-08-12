// // import React from 'react';

// // const WatchList = () => {
// //   return (
// //     <div>
// //       <h1>Your Watch List</h1>
// //       {/* Add more content here */}
// //     </div>
// //   );
// // };

import React from 'react';
import { Link } from 'react-router-dom';
import './watchlist.css'; // Ensure you have appropriate styles

const WatchList = ({ movies }) => {
  return (
    <div>
      <h1>Your Watch List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <h3>{movie.title}</h3>
            <Link to={`/movie/${movie.id}`} className="play-button">Play</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;



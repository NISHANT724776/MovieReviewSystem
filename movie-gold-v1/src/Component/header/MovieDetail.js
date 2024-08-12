import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id, 10));

  return (
    <div>
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
          <p>{movie.description}</p>
          {/* Add play functionality or embedded video player here */}
        </>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
  );
};

export default MovieDetail;


// export default Hero
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Hero = ({ movies }) => {
    const navigate = useNavigate();
    function handleReviewClick(e, movieId) {
        e.stopPropagation(); // Prevent event from bubbling up
        navigate(`/Reviews/${movieId}`);
    }
    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    function playTrailer(trailerLink) {
        const trailerId = trailerLink.substring(trailerLink.length - 11);
        navigate(`/Trailer/${trailerId}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie) => {
                        return (
                            <Paper key={movie.imdbId}>
                                <div className='movie-card-container-1'>
                                    <div className="movie-card-1" 
                                         style={{ "--img": `url(${movie.backdrops[0]})` }}
                                         onClick={(e) => {
                                            // Prevent click event on review button from triggering playTrailer
                                            if (e.target.closest('.movie-review-button-container')) return;
                                            playTrailer(movie.trailerLink);
                                        }} 
                                         >
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie?.poster} alt="" />
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon"
                                                            icon={faCirclePlay}
                                                        />
                                                    </div>
                                                </Link>

                                                <div className="movie-review-button-container">
                                                    <Button variant="info" onClick={(e) => {
                                                    e.stopPropagation(); // Prevent event from bubbling up to the movie card
                                                    reviews(movie.imdbId);
                                                }}>Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
            <div className="movie-cards-container">
                {movies?.map((movie) => (
                    <div key={movie.imdbId} 
                         className="movie-card" 
                         onClick={(e) => {
                            // Prevent click event on review button from triggering playTrailer
                            if (e.target.closest('.movie-card-buttons-container')) return;
                            playTrailer(movie.trailerLink);
                        }} 
                         >
                        <img src={movie.poster} alt={movie.title} className="movie-card-poster" />
                        <div className="movie-card-play-button">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                            />
                        </div>
                        <div className="movie-card-buttons-container">
                            <Button variant="info" onClick={(e) => {
                            e.stopPropagation(); // Prevent event from bubbling up to the movie card
                            reviews(movie.imdbId);
                        }}>Reviews</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Hero;

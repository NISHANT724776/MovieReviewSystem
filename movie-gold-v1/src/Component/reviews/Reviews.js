
import {useEffect, useRef, useState} from 'react';
import api from '../../api/axiosConfig';
// import { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {
    const {movieId} = useParams();
    const [poster, setPoster] = useState("");
    const revText = useRef();
    useEffect(() => {
        // getMovies();
        fetch(`http://localhost:8080/api/v1/movies/${movieId}`)
          .then(response => response.json())
          .then(data => {
            
            // console.log(data[0].poster); // Print movies object to console
            console.log(data); // Print movies object to console
            // setMovies(data);
            // setPoster(data.poster)
            
                setPoster(data.poster);
            
          })
          .catch(error => console.error('Error fetching movies:', error));
      },[])
    // console.log(movie);
    
    let params = useParams();

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
            <div className="movie-poster">
                <img src={poster || 'fallback-image-url.jpg'} alt="Movie Poster" />
               
            </div>
        
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm  revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews
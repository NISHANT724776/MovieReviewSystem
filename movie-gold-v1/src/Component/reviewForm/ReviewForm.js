import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const ReviewForm = ({revText,labelText,defaultValue}) => {
  const {movieId} = useParams();
  const [review, setReview] = useState()
  const submitReview = async () => {
    const reviewData = {
      reviewBody: review,
      imdbId: movieId
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/reviews', reviewData);
      console.log('Review submitted:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  function updateReview(e){
    setReview(e.target.value)
  }
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} value={review} onChange={updateReview} />
        </Form.Group>
        <Button variant="outline-info" onClick={submitReview}>Submit</Button>
    </Form>   

  )
}

export default ReviewForm
import React from 'react';
import ReviewEntry from './ReviewEntry.jsx';
import reviews from '../../sample-data/reviews.js';

/**
 * Create add a review form which sends a POST request
 * Enable "More Reviews" button to send a GET request to load more reviews
 * Enable sorting reviews by relevance, date, etc
 */

const ReviewList = () => {
  return (
    <div className="box">
      <h2>
        {reviews.results.length} reviews, sorted by <a href="#">relevance ↓</a>
      </h2>
      {reviews.results.map((review) => (
        <ReviewEntry review={review} />
      ))}
      <p>
        <button type="submit">More Reviews</button>
        &nbsp;
        <button type="submit">Add A Review +</button>
      </p>
    </div>
  );
};

export default ReviewList;

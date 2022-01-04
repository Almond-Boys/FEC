import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import calcStarImg from '../shared/calcStarImg.jsx';
import fetchReviews from '../shared/fetchReviews.js';

const moment = require('moment');

/**
 * TODO: Style response box
 */

const ReviewerNameDate = styled.span`
  float: right;
`

const ReviewEntry = ({ review, productId }) => {
  const date = moment(review.date);

  const handleClick = (e, review_id, type) => {
    e.preventDefault();
    axios.put(`/reviews/${type}`, { review_id: review_id })
      .then((res) => {
        alert(`You marked this review as ${type}`);
        fetchReviews(productId);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <div className="box">
      <span>{calcStarImg(review.rating)}</span>
      <ReviewerNameDate>
        {review.reviewer_name}, {date.format('MMMM Do, YYYY')}
      </ReviewerNameDate>
      <h3>{review.summary}</h3>
      <p>{review.body}</p>
      <p>{review.recommend ? '✔ I recommend this product' : ''}</p>
      <p>{review.response ? review.response : ''}</p>
      Helpful? <a href='#' onClick={ (e) => handleClick(e, review.review_id, 'helpful') }>Yes</a> ({review.helpfulness})&nbsp;
      | <a href="#" onClick={ (e) => handleClick(e, review.review_id, 'report') }>Report</a>
    </div>
  );
};

export default ReviewEntry;

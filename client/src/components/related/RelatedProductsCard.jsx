/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import calcStarImg from '../shared/calcStarImg.jsx';
import calcAvgTotalReviews from '../shared/calcAvgTotalReviews.js';
import RelatedModal from './RelatedModal.jsx';

// Color styling for category words
const GrayCategoryTitle = styled.a`
color: gray
`;

const RelatedProductsCard = (props) => {
  // ***********
  // State
  // ***********
  const [backupImage, setBackupImage] = useState(false);
  const [modalOpen, setModal] = useState(false);

  // Calculate avg review
  let averageReview = calcAvgTotalReviews(props.related.reviewsMeta).avgStars;

  // ***********
  // Func for rendering back up image
  // ***********
  const backupImgRender = (img) => {
    if (!img) {
      return '../../../images/small/placeHolder.png';
    } else {
      return img;
    }
  }

  // ***********
  // Func for rendering back up image
  // ***********
  const backupStarRender = (avgReview) => {
    if (isNaN(avgReview)) {
      return 3.25;
    } else {
      return avgReview;
    }
  }

  // ***********
  // Alter the product id at App level
  // ***********
  const relatedProductClick = (event) => {
    event.preventDefault();
    props.setProductId(props.relatedId);
  }

  // ***********
  // Func for opening and closing modals
  // ***********
  const handleModalOpen = () => {
    if (!modalOpen) {
      setModal(true);
      console.log(modalOpen);
    }
  };

  const handleModalClose = () => {
    if (modalOpen) {
      setModal(false);
    }
  }

  // ***********
  // Handle modal open button click
  // ***********
  const handleModalOpenClick = (event) => {
    event.preventDefault();
    handleModalOpen();
  }

  return (
    <div className='card'>
      <div>
        <img onClick={relatedProductClick} src={backupImgRender(props.related.styles.results[0].photos[0].thumbnail_url)} width='200' height='250'/>
      </div>
      <button onClick={handleModalOpenClick} className='modal-button'>♡</button>
      <div>
      <GrayCategoryTitle>
        {props.related.details.category}
      </GrayCategoryTitle>
      </div>
      <div>
        <a href="#top" onClick={relatedProductClick} >{props.related.details.name}</a>
      </div>
      <div>
        <a href="#top" onClick={relatedProductClick}>${props.related.details.default_price}</a>
      </div>
      <div>
        {calcStarImg(backupStarRender(averageReview))}
      </div>
      {!modalOpen ? '' : <RelatedModal
          handleModalClose={handleModalClose}
          currentProduct={props.currentProduct}
          relatedFeature={props.related.details}
        />}
    </div>
  )
};

export default RelatedProductsCard;

// <a>{props.relatedProductCategory}</a>
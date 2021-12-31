import React, { useState, useEffect } from 'react';
import Overview from './overview/Overview.jsx';
import Related from './related/Related.jsx';
import Reviews from './reviews/Reviews.jsx';
import Questions from './questions/Questions.jsx';
import products from '../sample-data/products.js';
import axios from 'axios';

export const App = () => {
  //******************************
  // STATE
  //******************************
  const [productId, setProductId] = useState();
  const [product, setProduct] = useState({});
  const [productStyle, setProductStyle] = useState({})
  const [reviewMetaData, setReviewMetaData] = useState({});
  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //******************************
  // Data fetching
  //******************************
  const fetchData = (id = 63609) => {
    const getProducts = axios.get('/products', {params: {product_id: id}})
      .then((res) => { setProduct(res.data); })
    const getStyles = axios.get('/products/styles', { params: { product_id: id}})
      .then((res) => { setProductStyle(res.data); } )
    const getReviewsMeta = axios.get('/reviews/meta', {params: { product_id: id }})
      .then(res => { setReviewMetaData(res.data); })
    // TODO - Allow reviews data to be refreshed indepently when a new review is submitted.
    // TODO - Allow reviews to be fetched based on order of sorting dropdown menu (newest, relevance, helpful)
    const getReviews = axios.get('/reviews', {params: { product_id: id, count: 10000, sort: 'newest' }})
      .then(res => { setReviews(res.data); })

    const promises = [getProducts, getStyles, getReviewsMeta, getReviews];
    Promise.all(promises)
      .then(() => { setIsLoading(false); })
      .catch((err) => { console.log(err) });
  }

  const updateProductId = () => {
    const url = new URL (document.URL)
    setProductId(url.search.split('=')[1]);
  }

  useEffect(() => {
    updateProductId();
    fetchData(productId);
    console.log('fetching data for product_id: ', productId);
  }, [productId])
  //******************************
  // Render
  //******************************
  if (isLoading) { return null }
  return (
    <div>
      <h1 className="title">Audacious Alder</h1>
      <Overview
        product={product}
        productStyle={productStyle}
        reviewMetaData={reviewMetaData}
      />
      <Related />
      <Reviews
        product={product}
        reviews={reviews}
        reviewMetaData={reviewMetaData}
        fetchData={fetchData}
      />
      <Questions />
    </div>
  )
}

export default App;

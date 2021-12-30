import React, { useState } from 'react';

const Cart = function ({ skus }) {
  const [size, setSize] = useState(null);

  const skusArray = [];
  const hash = {};

  for (const key in skus) {
    skusArray.push({ key: skus[key] });
  }

  for (const key in skus) {
    if (!hash[skus[key].size]) {
      hash[skus[key].size] = skus[key].quantity;
    }
  }

  const renderQuantity = () => {
    const quantArray = [];
    if (!size) {
      return (
        <option>
          Select Size
        </option>
      );
    }
    for (let i = 0; i < hash[size]; i++) {
      quantArray.push(
        <option>
          {i}
        </option>,
      );
    }
    return quantArray;
  };

  return (
    <div className="box">
      <select>
        {renderQuantity()}
      </select>
      <select onChange={(e) => { setSize(e.target.value); }}>
        {skusArray.map((sku, idx) => (
          <option
            key={idx}>
            {sku.key.size}
          </option>
        ))}
      </select>
      <button>
        Add to Cart
      </button>
    </div>
  );
};

export default Cart;

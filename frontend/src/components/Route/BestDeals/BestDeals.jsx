import React, { useEffect, useState } from 'react';
import styles from 'styles/style';
import ProductCard from '../ProductCard/ProductCard';
import API from 'api';

const BestDeals = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    API.get('/product/get-best-seller-products').then((res) => {
      setData(res.data.products);
    });
  }, []);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>

      <div
        className='grid grid-cols-1 gap-[5px] 
        md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'
      >
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>
    </div>
  );
};

export default BestDeals;

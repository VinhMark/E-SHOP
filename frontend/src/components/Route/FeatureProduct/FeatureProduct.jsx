import React, { useEffect, useState } from 'react';
import styles from 'styles/style';
import ProductCard from '../ProductCard/ProductCard';
import API from 'api';

const FeatureProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/product/get-all-products').then((res) => {
      setData(res.data.products);
    });
  }, []);
  return (
    <div>
      <div className={`${styles.section}`}>
        {/* Heading */}
        <div className={`${styles.heading}`}>
          <h1>Feature Products</h1>
        </div>

        {/* list item */}
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;

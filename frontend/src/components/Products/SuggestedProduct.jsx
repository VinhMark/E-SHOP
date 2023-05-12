import React, { useEffect, useState } from 'react';
import styles from 'styles/style';
import ProductCard from '../Route/ProductCard/ProductCard';
import API from 'api';

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    API.get('/product/get-all-products-category/' + data.category).then((res) => {
      setProducts(res.data.products);
    });
  }, [data.category]);

  return (
    <div>
      {data && (
        <div className={`${styles.section} mt-5`}>
          <div>
            <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>Related Products</h2>
          </div>

          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {products && products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;

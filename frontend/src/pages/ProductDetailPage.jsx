import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetail from '../components/Products/ProductDetail';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import API from 'api';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/product/get-product-slug/' + slug)
      .then((res) => {
        console.log(res.data.product);
        setData(res.data.product);
      })
      .catch((err) => console.log(err.response.data));
  }, [slug]);

  return (
    <div>
      <Header activeHeading={3} />
      <ProductDetail data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

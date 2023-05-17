import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetail from '../components/Products/ProductDetail';
import { useParams, useSearchParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import API from 'api';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const isEvent = searchParams.get('isEvent');

  useEffect(() => {
    if (isEvent) {
      API.get('/event/get-event-by-slug/' + slug)
        .then((res) => {
          setData(res.data.event);
        })
        .catch((err) => console.log(err.response.data));
    } else {
      API.get('/product/get-product-slug/' + slug)
        .then((res) => {
          setData(res.data.product);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, [slug, isEvent]);

  console.log(data)

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

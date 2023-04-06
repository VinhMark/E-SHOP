import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/style'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../components/Route/ProductCard/ProductCard'

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  console.log(categoryData)
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!categoryData) {
      const d = productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d = productData && productData.filter(i => i.category === categoryData);
      setData(d);
    }
  }, [categoryData])

  return (
    <div>
      <Header activeHeading={3} />
      <div className={`${styles.section} mt-12`}>
        <div className='mb-12 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] 
          lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px]'>
          {
            (data && data.length > 0) ? (
              data.map((i, index) => <ProductCard data={i} key={index} />)
            ) : (
              <h1 className='text-center w-full pb-[100px] text-[20px]'>
                No products Found!
              </h1>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ProductsPage
import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/style';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetailCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {

  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <div>
      {
        data ? (
          <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
            <div className='bg-white w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] rounded-md shadow-sm relative p-4 pt-8'>
              {/* Close button */}
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className='absolute right-3 top-3 z-50'
              />

              <div className="block w-full 800px:flex ">
                {/* Image left side */}
                <div className='w-full 800px:w-[50%]'>
                  <img src={data.image_Url[0].url} alt="" />
                  <div className='flex'>
                    <img
                      src={data.shop.shop_avatar.url} alt=""
                      className='w-[50px] h-[50px] rounded-full object-fill mr-2'
                    />

                    <div>
                      <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                      <h5 className='pb-3 text-[15px]'>({data.shop.ratings}) Ratings</h5>
                    </div>
                  </div>

                  {/* Button send message */}
                  <div onClick={() => handleMessageSubmit()} className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`} >
                    <span className='text-white flex items-center'>
                      Send Message <AiOutlineMessage className='ml-1' />
                    </span>
                  </div>

                  {/* Total sell */}
                  <h5 className='text-red-500 text-[16px] mt-5'>({data.total_sell}) Sold out</h5>
                </div>

                {/* Information product, right side */}
                <div className='w-full 800px:w-[50%] pt-5 px-[5px]'>
                  <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
                  <p>{data.description}</p>

                  {/* Price */}
                  <div className='flex pt-3'>
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}$
                    </h4>
                    <h3 className={`${styles.price}`}>{data.price ? data.price + '$' : null}</h3>
                  </div>

                  {/* Quantity and wishlist */}
                  <div className="flex items-center mt-12 justify-between pr-3">
                    {/* quantity */}
                    <div>
                      <button className='bg-gradient-to-r from-teal-400 to-teal-500
                       text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 
                       transition duration-300 ease-in-out' onClick={() => decrement()}> - </button>
                      <span className='bg-gray-200 text-gray-800 text-center px-4 py-2 font-medium inline-block w-[50px]'>
                        {count}
                      </span>
                      <button className='bg-gradient-to-l from-teal-400 to-teal-500
                       px-4 py-2 rounded-r text-white hover:opacity-75 transition 
                       duration-300 ease-in-out shadow-lg font-bold'  onClick={() => increment()}>+</button>
                    </div>

                    {/* wishlist */}
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className='cursor-pointer'
                          onClick={() => setClick(!click)}
                          color={click ? 'red' : '#333'}
                          title='Remove from wishlist'
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className='cursor-pointer'
                          onClick={() => setClick(!click)}
                          title='Add to wishlist'
                        />
                      )}
                    </div>
                  </div>

                  {/* Add to card */}
                  <div className={`${styles.button} mt-6 rounded h-11 flex items-center`}>
                    <span className='text-white flex items-center'>
                      Add to card <AiOutlineShoppingCart className='ml-2' size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default ProductDetailCard
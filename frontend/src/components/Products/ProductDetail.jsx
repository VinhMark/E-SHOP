import React, { useState } from 'react';
import styles from 'styles/style';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from 'api/server';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from 'redux/actions/cart';

const ProductDetail = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const handleSubmitMessage = () => {
    navigate('/inbox?conversation=507reqw9ashkjhasdasd');
  };

  const addToCartHandle = () => {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success('Item added to cart successfully!');
  };

  return (
    <div className='bg-white'>
      {data && (
        <div className={`unset ${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className='w-full py-5'>
            <div className='block w-full 800px:flex 800px:gap-5'>
              {/* photo items */}
              <div className='w-full 800px:w-[50%]'>
                <img src={`${backend_url}/${data.images[select]}`} alt='' className='w-[80%] mx-auto' />
                {/* Images */}
                <div className='w-full flex gap-3'>
                  {data.images.map((i, index) => (
                    <div key={index} className={`${select !== index && 'border-transparent'} border-4 cursor-pointer`}>
                      <img
                        src={`${backend_url}/${i}`}
                        alt=''
                        className='h-[200px] object-cover'
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Information product */}
              <div className='w-full 800px:w-[50%] pt-5'>
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className='flex pt-3'>
                  <h4 className={styles.productDiscountPrice}>${data.discountPrice}</h4>
                  <h3 className={styles.price}>{data.originalPrice ? data.originalPrice + '$' : null}</h3>
                </div>

                <div className={`${styles.normalFlex} mt-12 justify-between items-center pr-3`}>
                  <div className='flex'>
                    <button
                      onClick={() => setCount(count === 1 ? 1 : count - 1)}
                      className='bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-2 text-white rounded-l shadow-lg duration-300 hover:opacity-75 ease-in-out'
                    >
                      <HiOutlineMinus size={20} />
                    </button>
                    <span className='text-gray-900 font-medium px-4 py-2 bg-gray-200 w-[50px] text-center'>
                      {count}
                    </span>
                    <button
                      onClick={() => setCount(count + 1)}
                      className='bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-2 text-white rounded-r hover:opacity-75 duration-300 ease-in-out'
                    >
                      <HiPlus size={20} />
                    </button>
                  </div>

                  {click ? (
                    <AiFillHeart size={30} color='red' onClick={() => setClick(!click)} className='cursor-pointer' />
                  ) : (
                    <AiOutlineHeart size={30} onClick={() => setClick(!click)} className='cursor-pointer' />
                  )}
                </div>

                {/* Button add to cart */}
                <div
                  className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                  onClick={() => addToCartHandle()}
                >
                  <span className='text-white flex items-center'>
                    Add to cart <AiOutlineShoppingCart className='ml-1' size={20} />
                  </span>
                </div>

                {/* Shop */}
                <div className='flex items-center pt-8 gap-3'>
                  <img
                    src={`${backend_url}/${data.shop.avatar}`}
                    alt=''
                    className='w-[50px] h-[50px] rounded-full object-center'
                  />
                  <div className='pr-8'>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data.shop.name}</h3>
                    <h5 className='pb-3 text-[15px]'>({data.shop.ratings}/5) Ratings</h5>
                  </div>
                  <div className={` ${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`} onClick={handleSubmitMessage}>
                    <span className='text-white flex items-center'>
                      Send Message <AiOutlineMessage className='ml-1' />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailInfo data={data} />
        </div>
      )}
    </div>
  );
};

const ProductDetailInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
      {/* Tabs */}
      <div className='w-full flex justify-around border-b pt-10 pb-2'>
        <div className='relative'>
          <h5
            className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            onClick={() => setActive(1)}
          >
            Product detail
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`}></div>}
        </div>
        <div className='relative'>
          <h5
            className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`}></div>}
        </div>
        <div className='relative'>
          <h5
            className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`}></div>}
        </div>
      </div>

      {/* Contents */}
      {active === 1 && (
        <>
          <p className='py-5 text-[18px] leading-8 pb-10 whitespace-pre-line'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure amet dolores cupiditate quae minus corporis
            unde hic, mollitia totam libero nesciunt veritatis soluta distinctio voluptate sapiente eius beatae nobis
            rerum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae inventore voluptatum autem, nihil ab
            atque aperiam nesciunt nulla, eaque, quisquam vel incidunt nobis cumque exercitationem veniam et? Eum,
            obcaecati tempore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi itaque doloribus
            facere, fugit ut nisi vitae ipsum tenetur asperiores aliquid ipsam qui ea aspernatur saepe perspiciatis!
            Veritatis itaque voluptatem explicabo.
          </p>
          <p className='py-5 text-[18px] leading-8 pb-10 whitespace-pre-line'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure amet dolores cupiditate quae minus corporis
            unde hic, mollitia totam libero nesciunt veritatis soluta distinctio voluptate sapiente eius beatae nobis
            rerum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae inventore voluptatum autem, nihil ab
            atque aperiam nesciunt nulla, eaque, quisquam vel incidunt nobis cumque exercitationem veniam et? Eum,
            obcaecati tempore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi itaque doloribus
            facere, fugit ut nisi vitae ipsum tenetur asperiores aliquid ipsam qui ea aspernatur saepe perspiciatis!
            Veritatis itaque voluptatem explicabo.
          </p>
          <p className='py-5 text-[18px] leading-8 pb-10 whitespace-pre-line'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure amet dolores cupiditate quae minus corporis
            unde hic, mollitia totam libero nesciunt veritatis soluta distinctio voluptate sapiente eius beatae nobis
            rerum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae inventore voluptatum autem, nihil ab
            atque aperiam nesciunt nulla, eaque, quisquam vel incidunt nobis cumque exercitationem veniam et? Eum,
            obcaecati tempore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi itaque doloribus
            facere, fugit ut nisi vitae ipsum tenetur asperiores aliquid ipsam qui ea aspernatur saepe perspiciatis!
            Veritatis itaque voluptatem explicabo.
          </p>
        </>
      )}

      {active === 2 && (
        <div className='w-full justify-center min-h-[40vh] flex items-center'>
          <p>No reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className='w-full block 800px:flex p-5'>
          {/* Left content */}
          <div className='w-full 800px:w-[50%]'>
            <div className='flex items-center gap-2'>
              <img src={`${backend_url}/${data.shop.avatar}`} alt='' className='w-[50px] h-[50px] rounded-full' />
              <div>
                <h3 className={`${styles.shop_name} pb-0`}>{data.shop.name}</h3>
                <h5 className='pb-2 text-[15px]'>({data.shop.ratings}/5) Ratings</h5>
              </div>
            </div>
            <p className='pt-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio quae delectus error necessitatibus
              beatae, ipsum rerum laboriosam vitae explicabo doloribus labore dolore quam, accusamus cupiditate eum,
              odio aliquam quasi?
            </p>
          </div>

          {/* Right content */}
          <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
            <div className='text-left'>
              <h5 className='font-[600]'>
                Joined on: <span className='font-[400]'>14 March,2023</span>
              </h5>
              <h5 className='font-[600] mt-3'>
                Total Products: <span className='font-[400]'>1,223</span>
              </h5>
              <h5 className='font-[600] mt-3'>
                Total Reviews: <span className='font-[400]'>223</span>
              </h5>

              <div className={`${styles.button} !rounded-[4px] h-[39.5px] mt-3`}>
                <h4 className='text-white'>Visit shop</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

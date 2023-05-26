import API from 'api';
import { backend_url } from 'api/server';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsFillBagFill } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'styles/style';

const UserOrderDetails = () => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    API.get('/order/get-order/' + id).then((res) => setData(res.data.order));
  }, [id]);

  const handleOpenPopup = (item) => {
    setOpen(true);
    setSelectItem(item);
  };

  const reviewHandler = async (productId) => {
    await API.post(
      '/product/crate-new-review',
      { user, comment, rating, productId, orderId: data._id },
      { withCredentials: true }
    )
      .then((res) => {
        setOpen(false);
        setRating(1);
        setComment('');
        toast.success(res.data.message);
        setData(res.data.order);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Give a refund
  const refundHandler = async () => {
    API.put('/order/order-refund/' + data._id, { status: 'Processing Refund' })
      .then((res) => {
        toast.success('Order refund request successfully!');
        setData(res.data.order);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <BsFillBagFill size={30} color='crimson' />
          <h1 className='pl-2 text-[25px]'>Order Details</h1>
        </div>
        <Link to='/user/orders'>
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className='w-full flex items-center justify-between pt-6 text-[#00000084]'>
        <h5>
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5>
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* Order item */}
      <br />
      <br />
      <div className='800px:w-[90%] mx-auto w-full relative  bg-white border rounded-md p-3 '>
        {data &&
          data?.cart.map((item) => (
            <div className='w-full flex items-start mb-5' key={item._id}>
              <img src={`${backend_url}/${item.images[0]}`} alt='' className='w-[80px] h-[80px]' />
              <div className='w-full'>
                <h5 className='pl-3 text-[20px]'>{item.name}</h5>
                <h5 className='pl-3 text-[16px] text-[#00000084]'>
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>
              {data?.status === 'Delivered' && !item.isReviewed && (
                <div
                  className={`${styles.button} text-white w-fit whitespace-nowrap px-3`}
                  onClick={() => handleOpenPopup(item)}
                >
                  Write a review
                </div>
              )}
              {/* Check product is reviewed */}
              {item.isReviewed && (
                <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                  Reviewed
                </span>
              )}
            </div>
          ))}

        {/* Review Popup */}
        {open && (
          <PopupReview
            setOpen={setOpen}
            selectItem={selectItem}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            reviewHandler={reviewHandler}
          />
        )}

        <div className='border-t w-full text-right bg-white p-5 rounded-md'>
          <h5 className='text-[18px]'>
            Total Price: <strong>US${data?.totalPrice}</strong>
          </h5>
        </div>
      </div>
      <br />
      <br />
      <div className='800px:w-[90%] mx-auto w-full 800px:flex items-center gap-10 bg-white border rounded-md p-3 '>
        <table className='w-full 800px:w-[60%] border-collapse'>
          <tbody>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>Address 1</td>
              <td className='p-3'>{data?.shippingAddress.address1}</td>
            </tr>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>Address 2</td>
              <td className='p-3'>{data?.shippingAddress.address2}</td>
            </tr>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>Country</td>
              <td className='p-3'>{Country.getCountryByCode(data?.shippingAddress.country)?.name}</td>
            </tr>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>City</td>
              <td className='p-3'>
                {State.getStateByCodeAndCountry(data?.shippingAddress.city, data?.shippingAddress.country)?.name}
              </td>
            </tr>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>Phone Number</td>
              <td className='p-3'>{data?.user.phone}</td>
            </tr>
            <tr className='border border-slate-300'>
              <td className='border border-slate-300 p-3 font-[600]'>Status</td>
              <td className='p-3'>
                <span className='bg-green-100 text-green-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                  {data?.status}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='self-start'>
          <h4 className='py-3 text-[20px] font-[600]'>Payment Info:</h4>
          <h4>Type: {data?.paymentInfo?.type}</h4>
          <h4>Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}</h4>
          <br />
          {data?.status === 'Delivered' && (
            <div className={`${styles.button} text-white text-[20px]`} onClick={() => refundHandler()}>
              Give a refund
            </div>
          )}
        </div>
      </div>

      <br />
      <div className='800px:w-[90%] mx-auto '>
        <Link to='/' className={`${styles.button} text-white`}>
          Send Message
        </Link>
      </div>
    </div>
  );
};

const PopupReview = ({ selectItem, setOpen, rating, setRating, comment, setComment, reviewHandler }) => {
  return (
    <div className='w-full fixed top-0 left-0 bg-[#0005] z-50 h-screen flex justify-center items-center'>
      <div className='w-[100%] 800px:w-[50%] 800px:h-min h-[100vh] bg-white shadow rounded-md p-3'>
        <div className='w-full flex justify-end p-3'>
          <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
        </div>
        <h2 className='text-[30px] font-[500] font-Poppins text-center'>Give a Review</h2>
        <br />
        <div className='w-full flex'>
          <img src={`${backend_url}/${selectItem?.images[0]}`} alt='' className='h-[80px] w-[80px]' />
          <div>
            <div className='pl-3 text-[20px]'>{selectItem?.name}</div>
            <h4 className='pl-3 text-[20px]'>
              US${selectItem?.discountPrice} x {selectItem?.qty}
            </h4>
          </div>
        </div>
        <br />
        <br />

        {/* Ratings */}
        <h5>
          Give a Rating <span className='text-[red]'>*</span>
        </h5>
        <div className='w-full flex ml-2 pt-1'>
          {[1, 2, 3, 4, 5].map((item) =>
            rating >= item ? (
              <AiFillStar
                key={item}
                className='mr-1 cursor-pointer'
                color='rgb(246,186,0)'
                size={25}
                onClick={() => setRating(item)}
              />
            ) : (
              <AiOutlineStar
                key={item}
                className='mr-1 cursor-pointer'
                color='rgb(246,186,0)'
                size={25}
                onClick={() => setRating(item)}
              />
            )
          )}
        </div>

        <br />
        <div className='w-full ml-3'>
          <label className='block text-[20px] font-[500]'>
            Write a comment
            <span className='font-[400] text-[16px] text-[#00000052]'>(optional)</span>
          </label>
          <textarea
            name='comment'
            cols={20}
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='How was your product? write your expression about it!'
            className='mt-2 w-[95%] border p-2 outline-none'
          ></textarea>
        </div>

        <div className={`${styles.button} text-white text-[20px] ml-3`} onClick={() => reviewHandler(selectItem._id)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;

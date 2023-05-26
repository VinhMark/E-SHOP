import API from 'api';
import { backend_url } from 'api/server';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { BsFillBagFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllOrderByShop } from 'redux/actions/order';
import styles from 'styles/style';

const orderTracker = [
  'Processing',
  'Transferred to delivery partner',
  'Shipping',
  'Received',
  'On the way',
  'Delivered',
];

const orderRefund = ['Processing Refund', 'Refund Success'];

const OrderDetails = () => {
  const { seller } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [status, setStatus] = useState('');
  const [data, setData] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrderByShop(seller._id));
    API.get('/order/get-order/' + id).then((res) => {
      setData(res.data.order);
      setStatus(res.data.order.status);
    });
  }, [dispatch, seller, id]);

  const handleUpdateOrderStatus = () => {
    API.put('/order/update-status-order', { orderId: data._id, status }, { withCredentials: true })
      .then(() => {
        toast.success('Update status order successfully!');
        navigate('/dashboard-orders');
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  console.log(status);
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <BsFillBagFill size={30} color='crimson' />
          <h1 className='pl-2 text-[25px]'>Order Details</h1>
        </div>
        <Link to='/dashboard-orders'>
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
          </div>
        ))}
      <div className='border-t w-full text-right bg-white p-5 rounded-md'>
        <h5 className='text-[18px]'>
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>

      <br />
      <br />
      <div className='w-full 800px:flex items-center gap-10'>
        <table className='w-full 800px:w-[60%] border-collapse'>
          <tbody>
            <tr className='border border-slate-600'>
              <td className='border border-slate-600 p-3 font-[600]'>Address 1</td>
              <td className='p-3'>{data?.shippingAddress.address1}</td>
            </tr>
            <tr className='border border-slate-600'>
              <td className='border border-slate-600 p-3 font-[600]'>Address 2</td>
              <td className='p-3'>{data?.shippingAddress.address2}</td>
            </tr>
            <tr className='border border-slate-600'>
              <td className='border border-slate-600 p-3 font-[600]'>Country</td>
              <td className='p-3'>{Country.getCountryByCode(data?.shippingAddress.country)?.name}</td>
            </tr>
            <tr className='border border-slate-600'>
              <td className='border border-slate-600 p-3 font-[600]'>City</td>
              <td className='p-3'>
                {State.getStateByCodeAndCountry(data?.shippingAddress.city, data?.shippingAddress.country)?.name}
              </td>
            </tr>
            <tr className='border border-slate-600'>
              <td className='border border-slate-600 p-3 font-[600]'>Phone Number</td>
              <td className='p-3'>{data?.user.phone}</td>
            </tr>
          </tbody>
        </table>

        <div className='w-full 800px:w-[40%] self-start'>
          <h4 className='pt-3 text-[20px] font-[600]'>Payment Info:</h4>
          <h4>Type: {data?.paymentInfo?.type}</h4>
          <h4>Status: {data?.paymentInfo?.status}</h4>
        </div>
      </div>

      <h4 className='pt-3 text-[20px] font-[600]'>Order Status:</h4>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className='w-[200px] h-[35px] mt-2 rounded-[5px]'
      >
        {data && data.status !== 'Processing Refund'
          ? orderTracker.slice(orderTracker.findIndex((i) => i === data?.status)).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))
          : orderRefund.slice(orderRefund.findIndex((i) => i === data?.status)).map((item, i) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
      </select>
      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={() => handleUpdateOrderStatus()}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;

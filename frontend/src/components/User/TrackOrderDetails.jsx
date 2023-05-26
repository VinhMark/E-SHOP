import API from 'api';
import React, { useEffect, useState } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { MdTrackChanges } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import styles from 'styles/style';

const TrackOrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/order/get-order/' + id).then((res) => {
      setData(res.data.order);
    });
  }, [id]);

  return (
    <div className={`${styles.section} p-4 mx-2 rounded-lg min-h-screen bg-white`}>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <MdTrackChanges size={30} color='crimson' />
          <h1 className='pl-2 text-[25px]'>Order Tracker</h1>
        </div>
        <Link to='/user/track'>
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
          Placed on: <span>{new Date(data?.createdAt).toLocaleString()}</span>
        </h5>
      </div>

      {/* Order info */}
      <div className='800px:w-[90%] mx-auto w-full py-4 bg-white p-6 rounded-md mt-2'>
        <ol className='relative border-l border-gray-200'>
          {data &&
            data.tracker.map((i) => (
              <li className='mb-10 ml-6'>
                <span className='absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white'>
                  <AiFillCalendar color='blue' />
                </span>
                <h3 className='flex items-center mb-1 font-semibold'>Your order is {i.status}</h3>
                <time className='block mb-2 text-sm font-normal leading-none text-gray-400'>
                  {new Date(i.createdAt).toLocaleString()}
                </time>
                <p className='mb-4 text-base font-normal'>{i.message}</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default TrackOrderDetails;

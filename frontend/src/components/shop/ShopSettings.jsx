import API from 'api';
import { backend_url } from 'api/server';
import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadShop } from 'redux/actions/shop';
import styles from 'styles/style';

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

  const [avatar, setAvatar] = useState();
  const [shop, setShop] = useState({
    name: seller.name || '',
    description: seller.description || '',
    address: seller.address || '',
    phone: seller.phone || '',
    zip: seller.zip || '',
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    await API.put('/shop/update-shop-avatar', formData, config)
      .then((res) => {
        setAvatar(res.data.shop.avatar);
        toast.success('Update avatar successfully!');
        dispatch(loadShop());
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put('/shop/update-shop-info', shop, { withCredentials: true })
      .then((res) => {
        dispatch(loadShop());
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className='min-h-screen flex flex-col items-center w-full'>
      <div className='800px:w-[90%] flex flex-col justify-center mt-5 bg-white'>
        <div className='flex justify-center'>
          <div className='relative'>
            <img
              src={`${backend_url}/${avatar ? avatar : seller.avatar}`}
              className='w-[200px] h-[200px] rounded-full cursor-pointer object-cover'
              alt=''
            />
            <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px]'>
              <input type='file' id='image' className='hidden' onChange={handleImage} />
              <label htmlFor='image'>
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <form className='w-full 800px:w-[90%] bg-white flex flex-col items-center py-10' onSubmit={handleSubmit}>
        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <label htmlFor='block pb-2'>Shop Name</label>
          <input
            type='text'
            placeholder='Enter your shop name'
            value={shop.name}
            onChange={(e) => setShop((prev) => ({ ...prev, name: e.target.value }))}
            name='name'
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>

        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <label htmlFor='block pb-2'>Shop Description</label>
          <input
            type='text'
            placeholder='Enter your shop description'
            value={shop.description}
            name='description'
            onChange={(e) => setShop((prev) => ({ ...prev, description: e.target.value }))}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>

        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <label htmlFor='block pb-2'>Shop Address</label>
          <input
            type='text'
            placeholder='Enter your shop address'
            value={shop.address}
            name='address'
            onChange={(e) => setShop((prev) => ({ ...prev, address: e.target.value }))}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>

        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <label htmlFor='block pb-2'>Shop Phone</label>
          <input
            type='text'
            placeholder='Enter your shop phone'
            value={shop.phone}
            name='phone'
            onChange={(e) => setShop((prev) => ({ ...prev, phone: e.target.value }))}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>

        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <label htmlFor='block pb-2'>Shop Zip Code</label>
          <input
            type='text'
            placeholder='Enter your shop zip code'
            value={shop.zip}
            name='zip'
            onChange={(e) => setShop((prev) => ({ ...prev, zip: e.target.value }))}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>

        <div className='w-full 800px:w-[50%] mt-5 flex flex-col'>
          <input
            type='submit'
            value={'Update Shop'}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-pointer`}
          />
        </div>
      </form>
    </div>
  );
};

export default ShopSettings;

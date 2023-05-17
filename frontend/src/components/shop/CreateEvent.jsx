import API from 'api';
import React, { useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoriesData } from 'static/data';

const initialEvent = {
  images: [],
  name: '',
  description: '',
  category: '',
  tags: '',
  originalPrice: '',
  discountPrice: '',
  stock: '',
  startDate: null,
  endDate: null,
};

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({ ...initialEvent });
  const endDateRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const formData = new FormData();
    formData.append('shopId', seller._id);
    for (const [key, value] of Object.entries(product)) {
      formData.append(key, value);
    }

    // Call API
    API.post('/event/create-event', formData, config)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          toast.success('Event product created successfully!');
        }
        navigate('/dashboard-events');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleChangeInput = (e) => {
    setProduct((prev) => {
      const name = e.target.name;
      const value = e.target.value;
      console.log(value);
      //input image
      if (name === 'image') {
        const file = e.target.files[0];
        return { ...prev, image: file };
      }
      // input start date
      if (name === 'startDate') {
        const minEndDate = new Date(value).getTime() + 3 * 24 * 60 * 60 * 1000;
        endDateRef.current.min = new Date(minEndDate).toISOString().slice(0, 10);
        return { ...prev, [name]: value, endDate: null };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleRemoveImg = () => {
    document.getElementById('image').value = '';
    URL.revokeObjectURL(product.image);
    setProduct((prev) => ({ ...prev, image: null }));
  };

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white shadow rounded-[4px] p-3'>
      <h5 className='text-[30px] font-Poppins text-center'>Create Event</h5>

      {/* form create event */}
      <form onSubmit={handleSubmit}>
        <div className='mt-2'>
          <label htmlFor='name' className='pb-2'>
            Name <span className='text-[red]'>*</span>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={product.name}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter name'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='description' className='pb-2'>
            Description <span className='text-[red]'>*</span>
          </label>
          <textarea
            name='description'
            id='description'
            rows={5}
            value={product.description}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter description'
          ></textarea>
        </div>

        <div className='mt-3'>
          <label htmlFor='category' className='pb-2'>
            Category <span className='text-[red]'>*</span>
          </label>
          <select
            className='w-full border h-[35px] rounded-[5px] mt-2'
            value={product.category}
            name='category'
            id='category'
            onChange={handleChangeInput}
          >
            <option value=''>Choose a category</option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>

        <div className='mt-3'>
          <label htmlFor='tags' className='pb-2'>
            Tags
          </label>
          <input
            type='text'
            name='tags'
            id='tags'
            value={product.tags}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter event product tags'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='originalPrice' className='pb-2'>
            Original Price <span className='text-[red]'>*</span>
          </label>
          <input
            type='number'
            name='originalPrice'
            id='originalPrice'
            value={product.originalPrice}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter event product price'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='discountPrice' className='pb-2'>
            Price (With Discount) <span className='text-[red]'>*</span>
          </label>
          <input
            type='number'
            name='discountPrice'
            id='discountPrice'
            value={product.discountPrice}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter event product discount price'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='stock' className='pb-2'>
            Stock <span className='text-[red]'>*</span>
          </label>
          <input
            type='number'
            name='stock'
            id='stock'
            value={product.stock}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
            placeholder='Enter event product stock'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='startDate' className='pb-2'>
            Event Start Date <span className='text-[red]'>*</span>
          </label>
          <input
            type='date'
            name='startDate'
            id='startDate'
            min={new Date(Date.now()).toISOString().slice(0, 10)}
            value={product.startDate ? new Date(product.startDate).toISOString().slice(0, 10) : ''}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='endDate' className='pb-2'>
            Event End Date <span className='text-[red]'>*</span>
          </label>
          <input
            type='date'
            name='endDate'
            id='endDate'
            ref={endDateRef}
            min={new Date(Date.now()).toISOString().slice(0, 10)}
            value={product.endDate ? new Date(product.endDate).toISOString().slice(0, 10) : ''}
            onChange={handleChangeInput}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
          />
        </div>

        <div className='mt-3'>
          <label className='pb-2'>
            Upload Images<span className='text-[red]'>*</span>
          </label>
          <input type='file' name='image' id='image' className='hidden' onChange={handleChangeInput} />
          <div className='flex flex-wrap'>
            {product.images.length > 0 ? (
              product.images.map((item, i) => (
                <div
                  className='mt-2  relative border-[#555] border-[3px] rounded-md outline-none h-[120px] w-[120px]'
                  key={i}
                >
                  <img src={URL.createObjectURL(item)} className='w-full object-cover m-2' alt='' />
                  <RxCross1
                    className='absolute top-1 right-1 cursor-pointer'
                    size={20}
                    color='red'
                    onClick={() => handleRemoveImg(i)}
                  />
                  <RxCross1
                    className='absolute top-1 right-1 cursor-pointer'
                    size={20}
                    color='red'
                    onClick={() => handleRemoveImg()}
                  />
                </div>
              ))
            ) : (
              <label
                htmlFor='image'
                className='mt-2 cursor-pointer h-[120px] w-[120px] flex items-center justify-center border-[#555] border-[3px] rounded-md outline-none'
              >
                <AiOutlinePlusCircle size={30} color='#555' />
              </label>
            )}
          </div>
        </div>

        <div className='mt-3'>
          <button
            disabled={loading}
            className={`${
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            } appearance-none text-center flex items-center justify-center w-full px-3 h-[35px] border border-gray-300 rounded-[3px]focus:outline-none focus:ring-blue-500 bg-gray-200`}
          >
            {loading && (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            )}
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

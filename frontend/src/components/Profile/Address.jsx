import API from 'api';
import SelectInput from 'components/Form/SelectInput';
import { Country, State } from 'country-state-city';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserAddressSuccess } from 'redux/actions/user';
import styles from 'styles/style';

const initialForm = {
  country: '',
  city: '',
  zipCode: '',
  address1: '',
  address2: '',
  addressType: '',
};

const Address = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(initialForm);
  const addressType = [{ name: 'Default' }, { name: 'Home' }, { name: 'Office' }];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch({ type: 'ClearError' });
    };
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (address.addressType === '' || address.country === '' || address.city === '') {
      return toast.error('Please fill all the fields!');
    }

    const addressData = {
      ...address,
      country: address.country.isoCode,
      city: address.city.isoCode,
      addressType: address.addressType.name,
    };
    dispatch(updateUserAddressSuccess(addressData));
    if (!error) {
      setOpen(false);
    }
  };

  const handleDeleteAddress = (id) => {
    API.delete('/user/delete-user-address/' + id, { withCredentials: true })
      .then((res) => {
        toast.success('Delete address successfully!');
        dispatch({
          type: 'UpdateUserAddressSuccess',
          payload: res.data.user,
        });
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className='w-full'>
      {/* popup create address */}
      {open && (
        <div className='fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center'>
          <div className='w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-auto'>
            <div className='w-full flex justify-end p-3'>
              <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
            </div>
            <div className='w-full'>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='w-full block p-4'>
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='country'>
                      Country
                    </label>
                    <SelectInput
                      options={Country.getAllCountries()}
                      selected={address.country.isoCode}
                      setSelected={(item) => {
                        setAddress((prev) => ({ ...prev, country: item, city: {} }));
                      }}
                      value={address.country.name}
                      placeholder={'Choose your country'}
                    />
                  </div>

                  {/* city */}
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='city'>
                      City
                    </label>
                    <SelectInput
                      options={State.getStatesOfCountry(address.country?.isoCode)}
                      selected={address.city.isoCode}
                      setSelected={(item) => setAddress((prev) => ({ ...prev, city: item }))}
                      value={address.city.name}
                      placeholder={'Choose your city'}
                    />
                  </div>

                  {/* address 1 */}
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='address1'>
                      Address 1
                    </label>
                    <input
                      type='text'
                      name='address1'
                      className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
                      id='address1'
                      value={address.address1}
                      placeholder='Enter your address 1'
                      onChange={(e) => setAddress((prev) => ({ ...prev, address1: e.target.value }))}
                    />
                  </div>
                  {/* address 2 */}
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='address2'>
                      Address 2
                    </label>
                    <input
                      type='text'
                      name='address2'
                      className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
                      id='address2'
                      value={address.address2}
                      placeholder='Enter your address 2'
                      onChange={(e) => setAddress((prev) => ({ ...prev, address2: e.target.value }))}
                    />
                  </div>
                  {/* zipCode */}
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='zipCode'>
                      Zip Code
                    </label>
                    <input
                      type='text'
                      name='zipCode'
                      className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
                      id='zipCode'
                      value={address.zipCode}
                      placeholder='Enter your zip code'
                      onChange={(e) => setAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                    />
                  </div>

                  {/* Address type */}
                  <div className='w-full pb-2 relative'>
                    <label className='block pb-2' htmlFor='addressType'>
                      Address Type
                    </label>
                    <SelectInput
                      options={addressType}
                      value={address.addressType.name}
                      selected={address.addressType.name}
                      placeholder='Choose an type'
                      setSelected={(item) => setAddress((prev) => ({ ...prev, addressType: item }))}
                    />
                  </div>

                  {/* button */}
                  <div className='w-full pb-2'>
                    <input
                      type='submit'
                      className={`${styles.button} mt-5 cursor-pointer w-full text-white !rounded-md`}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Loading */}
            {loading && (
              <div className='absolute w-full inset-0 bg-[000004b] flex items-center justify-center'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
              </div>
            )}
          </div>
        </div>
      )}
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#00000ba] pb-2'>My Address</h1>
        <div className={`${styles.button} !rounded-md`} onClick={() => setOpen(true)}>
          <span className='text-white'>Add new</span>
        </div>
      </div>

      {user &&
        user.addresses.map((item) => (
          <div
            className='w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5'
            key={item._id}
          >
            <div className='flex items-center'>
              <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
            </div>
            <div className='pl-8 flex flex-col'>
              <h5 className='text-sm font-bold'>Address</h5>
              <h6 className='text-[12px] 800px:text-[unset]'>
                <p className=' line-clamp-1'>{item.address1}</p>
                <p className=' line-clamp-1'>{item.address2}</p>
              </h6>
            </div>
            <div className='pl-8 flex items-center justify-between'>
              <h6 className='text-[12px] 800px:text-[unset]'>{user && user.phone}</h6>
            </div>
            <div className='min-w-[10%] flex items-center justify-center pl-8'>
              <AiOutlineDelete size={25} className='cursor-pointer' onClick={() => handleDeleteAddress(item._id)} />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className='text-center pt-8 text-[18px]'>You not have any saved address!</h5>
      )}
    </div>
  );
};

export default Address;

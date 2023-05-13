import SelectInput from 'components/Form/SelectInput';
import { Country, State } from 'country-state-city';
import { useState } from 'react';
import styles from 'styles/style';

const ShippingInfo = ({ user, address, setAddress, cart }) => {
  const [userInfo, setUserInfo] = useState(true);

  const handleSetAddress = (item) => {
    const country = Country.getCountryByCode(item.country);
    const city = State.getStateByCodeAndCountry(item.city, item.country);
    setAddress((prev) => ({ ...prev, ...item, country, city }));
  };

  return (
    <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
      <h5 className='text-[18px] cursor-pointer inline-block font-[500]' onClick={() => setUserInfo(!userInfo)}>
        Choose From saved address
      </h5>
      {userInfo && (
        <div className='mb-8'>
          {user &&
            user.addresses.map((item) => (
              <div className='w-full flex items-center mt-1' key={item._id}>
                <input type='radio' name='address' className='mr-3' value={item.addressType} id={item._id} />
                <label htmlFor={item._id} className='cursor-pointer' onClick={() => handleSetAddress(item)}>
                  {item.addressType} : {item.address1}
                </label>
              </div>
            ))}
        </div>
      )}

      <h5 className='text-[18px] font-[500]'>Shipping Address</h5>
      <form className='mt-3'>
        <div className='w-full flex pb-3'>
          {/* Full name */}
          <div className='w-[50%]'>
            <label className='block pb-2'>Full Name</label>
            <input type='text' className={`${styles.input} !w-[95%]`} required value={user && user.name} />
          </div>
          {/* Email */}
          <div className='w-[50%]'>
            <label className='block pb-2'>Email</label>
            <input type='email' className={`${styles.input} !w-[95%]`} required value={user && user.email} />
          </div>
        </div>

        <div className='w-full flex pb-3'>
          {/* Phone number */}
          <div className='w-[50%]'>
            <label className='block pb-2'>Phone Number</label>
            <input type='text' className={`${styles.input} !w-[95%]`} required value={user && user.phone} />
          </div>
          {/* Zip code */}
          <div className='w-[50%]'>
            <label className='block pb-2'>Zip Code</label>
            <input
              type='text'
              className={`${styles.input} !w-[95%]`}
              required
              value={address.zipCode}
              onChange={(e) => setAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
            />
          </div>
        </div>

        {/* Phone number */}
        <div className='w-full mb-3'>
          <label className='block pb-2'>Country</label>
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
        {/* City */}
        <div className='w-full mb-3'>
          <label className='block pb-2'>City</label>
          <SelectInput
            options={State.getStatesOfCountry(address.country?.isoCode)}
            selected={address.city.isoCode}
            setSelected={(item) => setAddress((prev) => ({ ...prev, city: item }))}
            value={address.city.name}
            placeholder={'Choose your city'}
          />
        </div>
        <div className='w-full flex pb-3'>
          {/* Address 1 */}
          <div className='w-[50%]'>
            <label className='block pb-2'>Address 1</label>
            <input
              type='text'
              className={`${styles.input} !w-[95%]`}
              required
              value={address.address1}
              onChange={(e) => setAddress((prev) => ({ ...prev, address1: e.target.value }))}
            />
          </div>
          {/* Address 2*/}
          <div className='w-[50%]'>
            <label className='block pb-2'>Address 2</label>
            <input
              type='text'
              className={`${styles.input} !w-[95%]`}
              required
              value={address.address2}
              onChange={(e) => setAddress((prev) => ({ ...prev, address2: e.target.value }))}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;

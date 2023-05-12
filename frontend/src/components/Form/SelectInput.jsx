import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const SelectInput = ({ options, value, selected, setSelected, placeholder }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(options);
  const inputRef = useRef();

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setData(options.filter((i) => i.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setData(options);
    }
  };

  useEffect(() => {
    inputRef.current.value = value || '';
  }, [value]);

  useEffect(() => {
    setData(options)
  }, [setData, options])


  return (
    <div className='relative'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
        onFocus={() => setShow(true)}
        onBlur={() =>
          setTimeout(() => {
            setShow(false);
          }, 200)
        }
        onChange={handleSearch}
        aria-autocomplete='none'
        autoComplete='none'
        ref={inputRef}
      />

      <div
        className={`${!show && 'hidden'}
          absolute top-10 left-0 w-full max-h-[300px] overflow-y-auto bg-white shadow-lg border rounded-[5px] z-10`}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <p className={`block p-2 hover:bg-gray-400  cursor-pointer`} onClick={() => setSelected(item)} key={index}>
              {item.name}
            </p>
          ))
        ) : (
          <p className={`block p-2`}>-- No data --</p>
        )}
      </div>
      <HiOutlineChevronDown className='absolute right-2 top-3 cursor-pointer' onClick={() => setShow(true)} />
    </div>
  );
};

export default SelectInput;

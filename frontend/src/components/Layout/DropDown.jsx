import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'styles/style';

const DropDown = ({ categoriesData, setDropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log();
  const handleSubmit = (i) => {
    navigate(
      `/${location.pathname.split('/')[1] === 'best-selling' ? 'best-selling' : 'products'}?category=${i.title}`
    );
    setDropdown(false);
  };

  return (
    <div className='pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm'>
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div key={index} className={`${styles.normalFlex}`} onClick={() => handleSubmit(i)}>
            <img
              src={i.image_Url}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none',
              }}
              alt=''
            />
            <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;

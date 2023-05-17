import React from 'react';
import styles from 'styles/style';

const CheckoutStep = ({ active }) => {
  return (
    <div className='w-full  flex justify-center'>
      <div className='w-[90%] 800px:w-[50%] flex items-center flex-wrap justify-center'>
        {/* Step 1 */}
        <div className={styles.normalFlex}>
          <div className={styles.cart_button}>
            <span className={styles.cart_button_text}>1.Shipping</span>
          </div>
          {/* line */}
          <div className={` w-[30px] 800px:w-[70px] h-[4px] ${active > 1 ? '!bg-[#f63b60]' : '!bg-[#FDE1E6]'}`}></div>
        </div>
        {/* Step 2 */}
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button} ${active < 2 && '!bg-[#FDE1E6]'}`}>
            <span className={`${styles.cart_button_text} ${active < 2 && '!text-[#f63b60]'}`}>2.Payment</span>
          </div>
        </div>
        {/* Step 3 */}
        <div className={`${styles.normalFlex}`}>
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 3 ? ' !bg-[#f63b60]' : ' !bg-[#FDE1E6]'}`} />
          <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
            <span
              className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep;

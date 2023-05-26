import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderByShop } from 'redux/actions/order';
import styles from 'styles/style';

const ShopWithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.shop);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    dispatch(getAllOrderByShop(seller._id));

    const orderData = orders && orders.filter((item) => item.status === 'Delivered');
    setDelivered(orderData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalEarningWithoutTax = delivered.length > 0 && delivered.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);
  return (
    <div className='w-full h-[90vh] p-8'>
      <div className='bg-white h-full flex items-center justify-center flex-col'>
        <h5 className='text-[20px] pb-4'>Available Balance: ${availableBalance}</h5>
        <div className={`${styles.button} text-white !h-[40px] !rounded-md`}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoney;

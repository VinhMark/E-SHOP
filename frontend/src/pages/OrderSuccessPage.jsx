import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import animationData from '../Assets/animations/107043-success.json';
import { Player } from '@lottiefiles/react-lottie-player';

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div>
      <Player loop autoplay src={animationData} className='w-[300px] h-[300px]' />
      <h5 className='text-center mb-14 text-[25px] text-[#000000a1]'>Your order is successfully 😍</h5>
    </div>
  );
};

export default OrderSuccessPage;

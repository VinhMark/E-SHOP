import { Player } from '@lottiefiles/react-lottie-player';
import animationData from 'Assets/animations/24151-ecommerce-animation.json';

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Player loop autoplay src={animationData} className='w-[300px] h-[300px]' />
    </div>
  );
};

export default Loader;

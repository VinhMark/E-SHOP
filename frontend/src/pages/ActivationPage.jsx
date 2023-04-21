import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const activationEmail = async () => {
      try {
        const res = await API.post(
          '/user/activation',
          {
            activation_token,
          },
          { signal: controller.signal }
        );
        console.log(res.data);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.log(error);
          setError(true);
        }
      }
    };
    activationEmail();

    return () => {
      controller.abort();
    };
  }, [activation_token]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>}
    </div>
  );
};

export default ActivationPage;

import './App.css';

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ActivationPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  ProductDetailPage,
  ProductsPage,
  SignUpPage,
  ProfilePage,
} from './Routes';
import { loadUser } from './redux/actions/user';
import Store from './redux/store';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

const getCookie = (name) => {
  var cookies = document.cookie.split(';');
  if (!cookies.length) {
    return null;
  }

  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

const App = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const isLogin = getCookie('token');
    isLogin && Store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:name' element={<ProductDetailPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Notification config */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme='colored'
      />
    </BrowserRouter>
  );
};

export default App;

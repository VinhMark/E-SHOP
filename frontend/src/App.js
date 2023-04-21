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
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
} from './Routes';
import { loadUser } from './redux/actions/user';
import Store from './redux/store';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { loadShop } from 'redux/actions/shop';
import SellerProtectedRoute from 'SellerProtectedRoute';

// const getCookie = (name) => {
//   var cookies = document.cookie.split(';');
//   if (!cookies.length) {
//     return null;
//   }

//   for (let i = 0; i < cookies.length; i++) {
//     const cookiePair = cookies[i].split('=');
//     if (name === cookiePair[0].trim()) {
//       return decodeURIComponent(cookiePair[1]);
//     }
//   }
//   return null;
// };

const App = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { isSeller, isLoading, seller } = useSelector((state) => state.shop);

  useEffect(() => {
    // const token = getCookie('token');
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
  }, []);

  return (
    <>
      {isLoading && loading ? (
        <span>Loading...</span>
      ) : (
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
            <Route path='/shop-create' element={<ShopCreatePage />} />
            <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
            <Route
              path='/shop-login'
              element={
                <SellerProtectedRoute isSeller={isSeller} seller={seller}>
                  <ShopLoginPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/shop/:id'
              element={
                <SellerProtectedRoute isSeller={isSeller} seller={seller}>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
          </Routes>{' '}
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
      )}
    </>
  );
};

export default App;

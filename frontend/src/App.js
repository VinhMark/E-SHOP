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
  CheckoutPage,
} from './routes/UserRoutes';

import {
  SellerActivationPage,
  ShopAllCouponPage,
  ShopAllEventsPage,
  ShopAllProducts,
  ShopCreateEventPage,
  ShopCreatePage,
  ShopCreateProduct,
  ShopDashboardPage,
  ShopHomePage,
  ShopLoginPage,
} from './routes/ShopRoutes';
import { loadUser } from './redux/actions/user';
import Store from './redux/store';
import ProtectedRoute from 'routes/ProtectedRoute';
import { loadShop } from 'redux/actions/shop';
import SellerProtectedRoute from 'routes/SellerProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from 'components/shop/Layout/Loader';

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
  const { isStart, isLoading } = useSelector((state) => state.common);
  console.log(isStart, isLoading);

  useEffect(() => {
    const tokenUser = getCookie('token-user');
    const tokenShop = getCookie('token-shop');
    tokenUser && Store.dispatch(loadUser());
    tokenShop && Store.dispatch(loadShop());
    // Check is not login user or shop
    if (!tokenUser || tokenShop) {
      Store.dispatch({ type: 'StartApp' });
    }
  }, []);

  if (isLoading || !isStart) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:slug' element={<ProductDetailPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route
          path='/shop/:id'
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-create-product'
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-products'
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-create-event'
          element={
            <SellerProtectedRoute>
              <ShopCreateEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-events'
          element={
            <SellerProtectedRoute>
              <ShopAllEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-coupons'
          element={
            <SellerProtectedRoute>
              <ShopAllCouponPage />
            </SellerProtectedRoute>
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

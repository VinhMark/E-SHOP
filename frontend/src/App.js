import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActivationPage, BestSellingPage, ProductDetailPage, ProfilePage } from './routes/UserRoutes';
import {
  CheckoutPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  PaymentPage,
  SignUpPage,
  ProductsPage,
  OrderSuccessPage,
  EventDetailPage,
} from './routes/Routers';

import { SellerActivationPage, ShopCreatePage, ShopHomePage, ShopLoginPage } from './routes/ShopRoutes';
import { loadUser } from './redux/actions/user';
import Store from './redux/store';
import ProtectedRoute from 'routes/ProtectedRoute';
import { loadShop } from 'redux/actions/shop';
import SellerProtectedRoute from 'routes/SellerProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from 'components/shop/Layout/Loader';
import API from 'api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProfileContent from 'components/Profile/ProfileContent';
import AllOrders from 'components/shop/AllOrders';
import UserOrderDetails from 'components/User/UserOrderDetails';
import AllRefundOrders from 'components/Profile/AllRefundOrders';
import UserInbox from 'components/Profile/UserInbox';
import TrackOrder from 'components/Profile/TrackOrder';
import ChangePassword from 'components/Profile/ChangePassword';
import Address from 'components/Profile/Address';
import TrackOrderDetails from 'components/User/TrackOrderDetails';
import DashboardHero from 'components/shop/DashboardHero';
import Dashboard from 'components/shop/Layout/Dashboard';
import CreateProduct from 'components/shop/CreateProduct';
import AllProducts from 'components/shop/AllProducts';
import CreateEvent from 'components/shop/CreateEvent';
import AllEvents from 'components/shop/AllEvents';
import AllCoupons from 'components/shop/AllCoupons';
import ShopWithdrawMoney from 'components/shop/ShopWithdrawMoney';
import ShopInbox from 'components/shop/ShopInbox';
import OrderDetails from 'components/shop/OrderDetails';
import ShopSettings from 'components/shop/ShopSettings';
import UserAllOrders from 'components/Profile/UserAllOrders';

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
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await API.get('/payment/stripeApiKey');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
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
        <Route path='/event/:slug' element={<EventDetailPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/order/success' element={<OrderSuccessPage />} />

        {/* user path */}
        <Route
          path='/user/'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileContent />} />
          <Route path='orders' element={<UserAllOrders />} />
          <Route path='refunds' element={<AllRefundOrders />} />
          <Route path='inboxes' element={<UserInbox />} />
          <Route path='track' element={<TrackOrder />} />
          <Route path='update-password' element={<ChangePassword />} />
          <Route path='addresses' element={<Address />} />
          {/* path user/order/id */}
          <Route path='order/:id' element={<UserOrderDetails />} />
          <Route path='track/order/:id' element={<TrackOrderDetails />} />
        </Route>

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
          path='/shop/'
          element={
            <SellerProtectedRoute>
              <Dashboard />
            </SellerProtectedRoute>
          }
        >
          <Route index element={<DashboardHero />} />
          <Route path='dashboard' element={<DashboardHero />} />
          <Route path='settings' element={<ShopSettings />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='products' element={<AllProducts />} />
          <Route path='create-event' element={<CreateEvent />} />
          <Route path='events' element={<AllEvents />} />
          <Route path='coupons' element={<AllCoupons />} />
          <Route path='orders' element={<AllOrders />} />
          <Route path='refunds' element={<AllRefundOrders />} />
          <Route path='withdraw-money' element={<ShopWithdrawMoney />} />
          <Route path='inbox' element={<ShopInbox />} />
          <Route path='order/:id' element={<OrderDetails />} />
        </Route>

        <Route
          path='/payment'
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentPage />
              </Elements>
            )
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

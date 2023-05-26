import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { shopReducer } from './reducers/shop';
import { commonReducer } from './reducers/common';
import { productReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';
import { favoriteReducer } from './reducers/favorite';
import { orderReducer } from './reducers/order';
import { eventReducer } from './reducers/event';

const Store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    cart: cartReducer,
    wish: favoriteReducer,
    order: orderReducer,
    event: eventReducer,
  },
});

export default Store;

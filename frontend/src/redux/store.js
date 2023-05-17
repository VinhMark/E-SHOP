import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { shopReducer } from './reducers/shop';
import { commonReducer } from './reducers/common';
import { productReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';
import { favoriteReducer } from './reducers/favorite';
import { orderReducer } from './reducers/order';

const Store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    cart: cartReducer,
    wish: favoriteReducer,
    order: orderReducer,
  },
});

export default Store;

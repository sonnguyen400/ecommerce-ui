import { configureStore } from "@reduxjs/toolkit";
import { cartSlide } from "./cart/cartReducer.js";
import { orderSlice } from "./order/orderReducer.js";
import { userSlide } from "./user/userSlide.js";
import { userAddress } from "./address/addressSlide.js";

export const store = configureStore({
    reducer: {
        cart: cartSlide.reducer,
        order: orderSlice.reducer,
        user: userSlide.reducer,
        userAddress: userAddress.reducer,
    },
});

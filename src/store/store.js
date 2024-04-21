import { configureStore } from "@reduxjs/toolkit";
import { cartSlide } from "./cart/cartReducer.js";
import { orderSlice } from "./order/orderReducer.js";

export const store = configureStore({
    reducer: {
        cart: cartSlide.reducer,
        order: orderSlice.reducer
    }
});
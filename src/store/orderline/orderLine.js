import { createSlice } from "@reduxjs/toolkit";
export const addAllProductItem = function (state, action) {
    return action.payload;
}
export const empty = function (state, action) {
    return [];
}
export const add = function (state, action) {
    return [...state, action.payload];
}
export const orderLine = createSlice({
    name: "orderLine",
    initialState: [],
    reducers: {
        addAll: addAllProductItem,
        'empty': empty,
        'add': add
    }
})
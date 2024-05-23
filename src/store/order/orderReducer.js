import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    initialState: [],
    name: "order",
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
    },
});

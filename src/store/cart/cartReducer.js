import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIBase from "../../api/ApiBase";

export const addCartItem = createAsyncThunk(
    'cart/addNewItem',
    async (data, { rejectWithValue }) => {
        const response = await APIBase.post("api/v1/cart", data);
        return response.data;
    }
)
export const deleteCartItem = createAsyncThunk(
    'cart/deleteById',
    async (data, { rejectWithValue }) => {
        const response = await APIBase.delete(`api/v1/cart/${data}`);
        return response.data;
    }
)
export const updateCartItem = createAsyncThunk(
    'cart/updateQty',
    async (data, { rejectWithValue }) => {
        const response = await APIBase.put(`api/v1/cart/${data.id}`, data);
        return response.data;
    }
)
export const cartSlide = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addAll: (state, action) => {
            state = [...action.payload]
            return state;
        },
        findAll: (state, action) => {
            return state;
        },
        clear: (state, action) => {
            return [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCartItem.fulfilled, (state, action) => {
                return [...state, action.payload]
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                return state.filter(item => item.id !== action.payload)
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                for (let i = 0; i < state.length; i++) {
                    if (state[i].id === action.payload.id) {
                        state[i] = action.payload;
                    }
                }
                return state;
            }).addCase(updateCartItem.rejected, (state, action) => {
                console.log(action)
                return state;
            })

    }
})
export const { addAll } = cartSlide.actions
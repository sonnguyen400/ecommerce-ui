import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIBase from "../../api/ApiBase";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (data, { rejectWithValue }) => {
        const response = await APIBase.get(`auth/user`);
        return response.data;
    }
);
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (data, { rejectWithValue }) => {
        const response = await APIBase.get(`/logout`);
        return response.data;
    }
);
export const userSlide = createSlice({
    initialState: null,
    name: "user",
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state = null;
                return state;
            });
    },
});

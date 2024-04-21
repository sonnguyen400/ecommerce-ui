import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIBase from "../../api/ApiBase";
var cart=[];
APIBase.get("api/v1/cart")
.then(payload=>payload.data)
.then(data=>{
    cart=data;
}).catch(console.log)
export const postNewCartItem=createAsyncThunk(
    'cart/addItem',
    async (data,{rejectWithValue})=>{
        try{
            const response=await APIBase.post("api/v1/cart",data);
            return response.data;
        }catch(err){
            console.log(err)
        }
    }
)
export const cartSlide=createSlice({
    name:"cart",
    initialState:cart&&[],
    reducers:{
        deleteItem:(state,action)=>{
            APIBase.delete(`api/v1/cart/${action.payload.id}`)
            .then(console.log)
        }
    },
    extraReducers:(builder)=>{
        
        builder
        .addCase(postNewCartItem.pending,(state,action)=>{
            console.log("pending");
        })
        .addCase(postNewCartItem.fulfilled,(state,action)=>{
            state.push(action.payload);
        })
    }
})
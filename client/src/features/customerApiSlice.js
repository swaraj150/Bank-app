import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    customers:[],
    transfers:[]
}

export const getAllCustomers=createAsyncThunk("",async()=>{
    const response=await axios.get("http://localhost:80/api/create/login")
    return response.data;

})
const listSlice=createSlice({
    name:"List",
    initialState,




})
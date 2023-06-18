import { configureStore } from "@reduxjs/toolkit";
import showReducer from "./showSlice"


export const store = configureStore({
    reducer:{
show:showReducer
    }
})
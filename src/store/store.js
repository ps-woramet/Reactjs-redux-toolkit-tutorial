import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import personSlice from "./personSlice";

export const storeCf = configureStore({
    reducer:{
        // reducer name in stroe : reducer object
        // reducer name in store : useReducer
        // reducer object : userSlice
        userReducer: userSlice,
        personReducer :personSlice
    }
})
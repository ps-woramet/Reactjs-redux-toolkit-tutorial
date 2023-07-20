import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'hello initial state',
    list: [],
    loading: true
};

export const userSlice = createSlice({
    // name slice
    name: 'user',
    initialState: initialState,
    // action
    reducers:{
        clickred:((state,data1) => {
            state.value = "click red button";
            state.list = data1.payload;
            console.log(state.list);
            state.loading = true;
        }),
        clickblue:((state) => {
            state.value = "click blue button";
            state.loading = false;
        })
    }
});

export const {clickred, clickblue} = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'person',
};

export const personSlice = createSlice({
    // name slice
    name: 'person',
    initialState: initialState,
    // action
    reducers:{
        clickgreen:((state) => {
            state.value = "click green button";
        }),
        clickyellow:((state) => {
            state.value = "click yellow button";
        })
    }
});

export const {clickgreen, clickyellow} = personSlice.actions;
export default personSlice.reducer;
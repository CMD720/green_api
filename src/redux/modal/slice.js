import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    onOff: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalOnOff(state) {
            state.onOff = !state.onOff
        },

    },
})

export const {modalOnOff} = modalSlice.actions

export default modalSlice.reducer
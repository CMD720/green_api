import {createSlice} from "@reduxjs/toolkit";
import {getAccLocalStorage} from "../../utils/getDataFromLocalStorage";


const initAcc = getAccLocalStorage()

const initialState = {
    idInstance: initAcc.idInstance,
    apiTokenInstance: initAcc.apiTokenInstance,
    logged:initAcc.logged
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logIn(state, action) {
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance
            state.logged = true
        },
        logOut(state) {
            state.idInstance = ""
            state.apiTokenInstance = ""
            state.logged = false
        }
    }
})

export default accountSlice.reducer

export const {logIn, logOut} = accountSlice.actions
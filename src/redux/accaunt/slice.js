import {createSlice} from "@reduxjs/toolkit";
import {getAccLocalStorage} from "../../utils/getDataFromLocalStorage";


const initAcc = getAccLocalStorage()

const initialState = {
    idInstance: initAcc.idInstance,
    apiTokenInstance: initAcc.apiTokenInstance,
    wid: initAcc.wid,
    avatarURL: initAcc.avatarURL,
    name: initAcc.name,
    logged: initAcc.logged
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logIn(state, action) {
            // console.log(action.payload);
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance
            state.wid = action.payload.id
            state.avatarURL = action.payload.avatar
            state.name = action.payload.name
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
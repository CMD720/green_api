import {combineReducers, configureStore} from "@reduxjs/toolkit";
import chatSlice from './chat/slice'
import messagesSlice from "./messages/slice";
import accountSlice from "./accaunt/slice"
import modalSlice from "./modal/slice";


const rootReducer = combineReducers({
    chats: chatSlice,
    messages: messagesSlice,
    account: accountSlice,
    modal: modalSlice,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


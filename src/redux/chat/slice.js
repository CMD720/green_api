import {createSlice} from "@reduxjs/toolkit";
import {getChatLocalStorage} from "../../utils/getDataFromLocalStorage";

const initChat = getChatLocalStorage()

const initialState = {
    chatId: initChat.chatId,
}

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChat(state, action){
            state.chatId.push(action.payload)
        },
        removeChat(state){
            state.chatId = []
        }
    }
})

export default chatSlice.reducer

export const {addChat,removeChat} = chatSlice.actions
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chatMessages: [],
    currentMessages:[],
    flag: true,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        getHistory(state, action) {
            // console.log(action.payload);
            // const findChat = state.chatMessages.find(item => {
            //     return (item.chatId === action.payload.chatId)
            // })
            // // console.log(findChat);
            // if(findChat){
            //     state.currentMessages = findChat.messages
            // }else{
            //     state.chatMessages.push(action.payload)
            //     state.currentMessages = action.payload.messages
            // }

            state.currentMessages = action.payload.messages
        },
        getMessage(state, action) {
            state.currentMessages.push(action.payload)
        },
        setFlag(state) {
            state.flag = !state.flag
        },

    }
})

export default messagesSlice.reducer

export const {getHistory, getMessage, reloadChat, setFlag} = messagesSlice.actions
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    messages: [],
    flag: true,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        getHistory(state, action) {
            state.messages = action.payload
        },
        getMessage(state, action) {
            state.messages.push(action.payload)
        },
        reloadChat(state) {
            state.messages = []
        },
        setFlag(state) {
            state.flag = !state.flag
        }
    }
})

export default messagesSlice.reducer

export const {getHistory, getMessage, reloadChat, setFlag} = messagesSlice.actions
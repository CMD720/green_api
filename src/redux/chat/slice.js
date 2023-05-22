import {createSlice} from "@reduxjs/toolkit";
import {getChatLocalStorage} from "../../utils/getDataFromLocalStorage";

const initChat = getChatLocalStorage()

const initialState = {
    chats: initChat.chats,
    // currentChat:initChat.currentChat,
    currentChat:{id:"", avatar:"", name:"", noReadMessageCount: 0},
}

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChat(state, action){
            const findChat = state.chats.find(item => {
                return (item.id === action.payload.id)
            })

            if(findChat){
                state.currentChat = action.payload
            }else{
                state.chats.push(action.payload)
            }

        },
        removeChat(state){
            state.chats = []
            state.currentChat = {}
        },
        setCurrentChatId(state, action){
            state.currentChat = action.payload
            const findChat = state.chats.find(item => {
                return (item.id === action.payload.id)
            })
            if(findChat){
                findChat.noReadMessageCount = 0
            }
            // state.currentChat = {...action.payload, noReadMessageCount: 0}
            // state.currentChat.noReadMessageCount = 0
        },
        setMessageCount(state,action){
            const findChat = state.chats.find(item => {
                return (item.id === action.payload)
            })
            if(findChat){
                findChat.noReadMessageCount++
            }
        }
    }
})

export default chatSlice.reducer

export const {addChat,removeChat,setCurrentChatId,setMessageCount} = chatSlice.actions
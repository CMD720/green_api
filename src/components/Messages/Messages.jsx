import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styles from "./Messages.module.scss";
import {sendMessage} from "../../utils/sendMessage";
import {deleteNotification} from "../../utils/deleteNotification";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {messagesSelector} from "../../redux/messages/selectors";
import {getHistory, getMessage} from "../../redux/messages/slice";
import ChatHead from "../chatHead/chatHead";
import {accountSelector} from "../../redux/accaunt/selector";
import InputMessage from "./inputMessage";
import MessagesHead from "../chatHead/messagesHead";
import { useWhyDidYouUpdate } from 'ahooks';
import {chatsSelector} from "../../redux/chat/selectors";

const Messages = () => {
    useWhyDidYouUpdate('MESSGES', {});
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)
    const {chatMessages, flag, currentMessages} = useAppSelector(messagesSelector)
    const {currentChat} = useAppSelector(chatsSelector)
    const dispatch = useAppDispatch()

    const msgBoard = useRef(null)
    const lastMessage = useRef(null)

    const getChatHistory = async () => {
        const chatHistory = {
            "chatId": currentChat.id,
            // "count": 10
        }
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
                {
                    ...chatHistory
                })
            const historyData = {
                chatId: currentChat,
                messages: data.reverse(),
            }
            dispatch(getHistory(historyData))
            setTimeout(()=>{lastMessage.current?.scrollIntoView(false)},1000)
        }catch (error) {
            console.error('GetChatHistory',error)
        }
    }

    useEffect(() => {
        getChatHistory(currentChat)
    }, [currentChat,flag])

    useEffect(() => {
        const height = msgBoard.current?.children[0].clientHeight ?? 50
        msgBoard.current?.scrollTo({
            top: msgBoard.current?.scrollTop + height,
            behavior: "smooth",
        })
    }, [currentMessages])

    // lastMessage.current?.scrollIntoView(false)
    return (
        <div className={styles.opened_chat}>
            <MessagesHead/>
            <div ref={msgBoard} className={styles.message_board}>
                {
                    currentMessages.map((message, index) => (
                        <div key={index}
                             className={message.type === "incoming" ? styles.in_message : styles.out_message}>
                            {
                                message?.textMessage
                            }
                        </div>
                    ))
                }
                <div ref={lastMessage}></div>
            </div>
            <InputMessage/>
        </div>
    );
};

export default Messages;
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


const Messages = ({chatId}) => {

    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)
    const {messages, flag} = useAppSelector(messagesSelector)
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)
    const msgBoard = useRef(null)
    const lastMessage = useRef(null)
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const clearInput = () => {
        setValue('')
        inputRef.current?.focus()
    }
    const onChangeInput = (event) => {
        setValue(event.target.value)
    }
    const keyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(chatId, value,apiTokenInstance, idInstance).catch(error => console.log(error));
            clearInput();
        }
    }

    const getMessages = async (chatId, idMessage) => {
        const messageData = {
            "chatId": chatId,
            "idMessage": idMessage
        }
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getMessage/${apiTokenInstance}`,
                {
                    ...messageData
                }
            )
            // console.log('Получаем сообщение')
            // dispatch(getMessage(data))
            return data
        }catch (error) {
            console.error('getMessage',error)
        }
    }

    const receiveNotification = async () => {
        try {
            const {data} = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
            if (data !== null) {
                // console.log('Входящее заявка - ', data.receiptId);
                await getMessages(chatId, data.body.idMessage).then(response => {
                    // console.log('проверка получения сообщения',response);
                    dispatch(getMessage(response))
                    const receiptId = data.receiptId
                    deleteNotification(receiptId, apiTokenInstance, idInstance)
                })

                // const receiptId = data.receiptId
                // deleteNotification(receiptId, apiTokenInstance, idInstance)
            }
            // else {
            //     console.log('Data is NULL')
            // }
        }catch (error) {
            console.error('ReceiveNotification',error)
        }
    }

    const getChatHistory = async () => {
        const chatHistory = {
            "chatId": chatId,
            // "count": 10
        }
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
                {
                    ...chatHistory
                })
            dispatch(getHistory(data.reverse()))
            setIsLoading(true)
        }catch (error) {
            console.error('GetChatHistory',error)
        }

    }

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                receiveNotification()
            }, 5000)
            return () => clearInterval(interval);
        }
    }, [isLoading])

    useEffect(() => {
        getChatHistory(chatId)
    }, [flag])

    useEffect(() => {
        const height = msgBoard.current?.children[0].clientHeight ?? 50
        msgBoard.current?.scrollTo({
            top: msgBoard.current?.scrollTop + height,
            behavior: "smooth",
        })
    }, [messages])

    lastMessage.current?.scrollIntoView(false)
    return (
        <div className={styles.opened_chat}>
            <ChatHead chatId={chatId} activeChatId={chatId}/>
            <div ref={msgBoard} className={styles.message_board}>
                {
                    messages.map((message, index) => (
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
            <div className={styles.input_message} >
                <input
                    ref={inputRef}
                    value={value}
                    onChange={onChangeInput}
                    onKeyDown={keyPress}
                    className={styles.input} placeholder="Enter message" type="text"/>
                {/*<div onClick={()=>receiveNotification()} >GET-MESSAGE</div>*/}
            </div>
        </div>
    );
};

export default Messages;
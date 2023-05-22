import React, {useEffect, useState} from 'react';
import {deleteNotification} from "../../utils/deleteNotification";
import axios from "axios";
import {getMessage} from "../../redux/messages/slice";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {chatsSelector} from "../../redux/chat/selectors";
import {accountSelector} from "../../redux/accaunt/selector";
import {setMessageCount} from "../../redux/chat/slice";

const Notifications = React.memo(() => {

    const dispatch = useAppDispatch()
    const{currentChat} = useAppSelector(chatsSelector)
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)
    const [isLoading, setIsLoading] = useState(false)
    const getMessages = async (chatId, idMessage) => {
        const messageData = {
            "chatId": chatId,
            "idMessage": idMessage
        }
        // console.log('MESSAGE DATA',messageData);
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getMessage/${apiTokenInstance}`,
                {
                    ...messageData
                }
            )
            // console.log('Получаем сообщение')
            dispatch(getMessage(data))
            return data
        }catch (error) {
            console.error('getMessage',error)
        }
    }
    const receiveNotification = async () => {
        const {data} = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
        return data;

    }

    useEffect(()=>{
        if(isLoading){
            const interval = setInterval(() => {
                receiveNotification().then(response => {
                    if (response){
                        // console.log('1',response)
                        deleteNotification(response.receiptId, apiTokenInstance, idInstance).catch(error => console.error('deleteNotification',error))
                        // getMessages(currentChat.id, response.body.idMessage)
                        if(response.body.senderData.chatId === currentChat.id){
                            getMessages(currentChat.id, response.body.idMessage)
                        }else {
                            console.log('пришло сообщение в другой чат')
                            dispatch(setMessageCount(response.body.senderData.chatId))

                        }
                    }else{
                        // console.log('2',response);
                    }
                })

            }, 5000)
            return () => clearInterval(interval);
        }
        setIsLoading(true)
    },[currentChat])

});

export default Notifications;
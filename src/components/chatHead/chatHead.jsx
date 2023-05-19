import React, {useEffect, useState} from 'react';
import styles from "./chatHead.module.scss";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {messagesSelector} from "../../redux/messages/selectors";
import {accountSelector} from "../../redux/accaunt/selector";
import {chatsSelector} from "../../redux/chat/selectors";
import {setCurrentChatId} from "../../redux/chat/slice";

const ChatHead = ({chatId}) => {

    const dispatch = useAppDispatch()
    const {flag} = useAppSelector(messagesSelector)
    const {currentChat} = useAppSelector(chatsSelector)
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)

    const [avatarURl, setAvatarUrl] = useState("")
    const [chatName, setChatName] = useState("")

    const rootClasses = [styles.chat_head]
    if(currentChat === chatId){
        rootClasses.push(styles.selected)
    }

    const onClickChat = () => {
        dispatch(setCurrentChatId(chatId))
    }
    //TODO getContactInfo to js
    const getContactInfo =  async () => {
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                {
                    "chatId": chatId,
                }
            )
            await setAvatarUrl(data.avatar)
            await setChatName(data.name)
        }catch (error) {
            console.error('getContactInfo',error)
        }

    }
    useEffect(()=>{
        getContactInfo().catch(error => console.log(error))
    },[flag])

    return (
        <div onClick={onClickChat} className={rootClasses.join(' ')}>
            <div className={styles.chat_avatar}>
                <img src={avatarURl} alt="avatar"/>
            </div>
            <div className={styles.chat_name_wrapper}>
                <div className={styles.chat_name}>
                    {
                        chatName === "" ?chatId.slice(0,-5) :chatName
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatHead;
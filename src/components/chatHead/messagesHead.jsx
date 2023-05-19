import React, {useEffect, useState} from 'react';
import styles from "./chatHead.module.scss";
import axios from "axios";
import {useAppSelector} from "../../redux/storeHooks";
import {accountSelector} from "../../redux/accaunt/selector";
import {chatsSelector} from "../../redux/chat/selectors";

const MessagesHead = () => {
    const{currentChat} = useAppSelector(chatsSelector)
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)

    const [avatarURl, setAvatarUrl] = useState("")
    const [chatName, setChatName] = useState("")

    const rootClasses = [styles.chat_head ,styles.selected]

    //TODO getContactInfo to js
    const getContactInfo =  async () => {
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                {
                    "chatId": currentChat,
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
    },[currentChat])

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.chat_avatar}>
                <img src={avatarURl} alt="avatar"/>
            </div>
            <div className={styles.chat_name_wrapper}>
                <div className={styles.chat_name}>
                    {
                        chatName === "" ?currentChat.slice(0,-5) :chatName
                    }
                </div>
            </div>
        </div>
    );
};

export default MessagesHead;
import React, {useEffect, useState} from 'react';
import styles from "./chatHead.module.scss";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {setFlag} from "../../redux/messages/slice";
import {messagesSelector} from "../../redux/messages/selectors";
import {accountSelector} from "../../redux/accaunt/selector";

const ChatHead = ({setActive,chatId,activeChatId}) => {

    const dispatch = useAppDispatch()
    const {flag} = useAppSelector(messagesSelector)
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)

    const [avatarURl, setAvatarUrl] = useState("")
    const [chatName, setChatName] = useState("")

    const rootClasses = [styles.chat_head]
    if(activeChatId === chatId){
        rootClasses.push(styles.selected)
    }

    const onClickChat = () => {
        setActive(chatId)
        dispatch(setFlag())
    }

    const getContactInfo =  async () => {
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                {
                    "chatId": chatId,
                }
            )
            // console.log('Contact INFO - ',data);
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
import React from 'react';
import styles from "./chatHead.module.scss";
import {useAppSelector} from "../../redux/storeHooks";
import {chatsSelector} from "../../redux/chat/selectors";

const MessagesHead = () => {

    const{currentChat} = useAppSelector(chatsSelector)
    const rootClasses = [styles.chat_head ,styles.selected]

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.chat_avatar}>
                <img src={currentChat.avatar} alt="avatar"/>
            </div>
            <div className={styles.chat_name_wrapper}>
                <div className={styles.chat_name}>
                    {
                        currentChat.name === "" ?currentChat.id.slice(0,-5) :currentChat.name
                    }
                </div>
            </div>
        </div>
    );
};

export default MessagesHead;
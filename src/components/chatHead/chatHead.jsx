import React from 'react';
import styles from "./chatHead.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {chatsSelector} from "../../redux/chat/selectors";
import {setCurrentChatId} from "../../redux/chat/slice";

const ChatHead = ({chat}) => {

    const {id, avatar, name, noReadMessageCount} = chat
    const dispatch = useAppDispatch()
    const {currentChat} = useAppSelector(chatsSelector)

    const rootClasses = [styles.chat_head]
    if (currentChat.id === id) {
        rootClasses.push(styles.selected)
    }

    const onClickChat = () => {
        dispatch(setCurrentChatId(chat))
    }

    return (
        <div onClick={onClickChat} className={rootClasses.join(' ')}>
            <div className={styles.chat_avatar}>
                <img src={avatar} alt="avatar"/>
            </div>
            <div className={styles.chat_name_wrapper}>
                <div className={styles.chat_name}>
                    {
                        name === "" ? id.slice(0, -5) : name
                    }
                </div>
            </div>
            {
                noReadMessageCount!==0 &&(<div className={styles.message_count}>
                    {noReadMessageCount}
                </div>)
            }
        </div>
    );
};

export default ChatHead;
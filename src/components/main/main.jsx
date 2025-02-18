import React, { useState } from 'react';
import styles from './main.module.scss'
import Messages from "../Messages/Messages";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import ChatHead from "../chatHead/chatHead";
import NotSelectedChat from "../ notSelectedChat/notSelectedChat";
import Modal from "../modal/modal";
import {accountSelector} from "../../redux/accaunt/selector";
import {chatsSelector} from "../../redux/chat/selectors";
import {logOut} from "../../redux/accaunt/slice";
import AddChat from "../addForm/addChat";
import {modalOnOff} from "../../redux/modal/slice";
import {removeChat} from "../../redux/chat/slice";
import Notifications from "../chatHead/Notifications";
import Tooltip from "../Tooltip/tooltip"

const Main = () => {

    const {wid, avatarURL, name} = useAppSelector(accountSelector)
    const{chats,currentChat} = useAppSelector(chatsSelector)
    const dispatch = useAppDispatch()

    const [tooltip, setTooltip] = useState(false)
    
    const onClickLogOut = () => {
        dispatch(logOut())
        dispatch(removeChat())
    }

    const renderChats = chats.map((chat, index)=><ChatHead key={index} chat={chat}/>)
    return (
        <div className={styles.main}>
            <div className={styles.chats}>
                <Notifications/>
                <div className={styles.profile}>
                    <div onClick={onClickLogOut} className={styles.logOut}
                        onMouseEnter={() => setTooltip(true)}
                        onMouseLeave={() => setTooltip(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30">
                            <path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z"/>
                            <path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z"/>
                        </svg>
                        {
                            tooltip && <Tooltip>
                                            <p>Log Out</p>
                                        </Tooltip>
                        }
                    </div>
                    <div className={styles.chat_head}>
                        <div className={styles.chat_avatar}>
                            <img
                                src={avatarURL}
                                alt="avatar"/>
                        </div>
                        <div className={styles.chat_name_wrapper}>
                            <div className={styles.chat_name}>
                                {
                                    name ?name :wid.slice(0,-5)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={()=>dispatch(modalOnOff())} className={styles.add_Chat}>
                    <svg id="Layer_1" height="35" viewBox="0 0 24 24" width="35" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                        <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/>
                    </svg>
                </div>
                <hr/>
                {renderChats}
            </div>
            {
                currentChat.id === ""
                    ? <NotSelectedChat/>
                    : <Messages/>
            }
            <Modal>
                <AddChat/>
            </Modal>
        </div>
    );
};

export default Main;
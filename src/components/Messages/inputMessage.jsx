import React, {useRef, useState} from 'react';
import styles from "./Messages.module.scss";
import {sendMessage} from "../../utils/sendMessage";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {accountSelector} from "../../redux/accaunt/selector";
import {setFlag} from "../../redux/messages/slice";
import {chatsSelector} from "../../redux/chat/selectors";

const InputMessage = () => {

    const dispatch = useAppDispatch()
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)
    const {currentChat} = useAppSelector(chatsSelector)
    const inputRef = useRef(null)
    const [value, setValue] = useState('')
    const clearInput = () => {
        setValue('')
        inputRef.current?.focus()
    }
    const onChangeInput = (event) => {
        setValue(event.target.value)
    }
    const onClickSendMessage = () => {
        sendMessage(currentChat, value, apiTokenInstance, idInstance).catch(error => console.log(error));
        setTimeout(() => {
            dispatch(setFlag())
        }, 1000)
        clearInput();
    }
    const keyPress = (event) => {
        if (event.key === 'Enter') {
            if(value)onClickSendMessage()
        }
    }

    return (
        <div className={styles.input_message}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                onKeyDown={keyPress}
                placeholder="Enter message" type="text"/>
            {
                value &&
                <div onClick={clearInput} className={styles.clear_input}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                    </svg>
                </div>
            }
            <button disabled={value === ""} onClick={onClickSendMessage} className={styles.send_message}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="#00a884"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default InputMessage;
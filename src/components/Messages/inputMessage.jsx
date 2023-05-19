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
    const keyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(currentChat, value,apiTokenInstance, idInstance).catch(error => console.log(error));
            setTimeout(()=>{dispatch(setFlag())},2000)
            clearInput();
        }
    }

    return (
        <div className={styles.input_message} >
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                onKeyDown={keyPress}
                className={styles.input} placeholder="Enter message" type="text"/>
        </div>
    );
};

export default InputMessage;
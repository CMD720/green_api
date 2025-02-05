import React, {useRef, useState} from 'react';
import styles from './addForm.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {addChat} from "../../redux/chat/slice";
import {modalOnOff} from "../../redux/modal/slice";
import axios from "axios";
import {accountSelector} from "../../redux/accaunt/selector";
import {getContactInfo} from "../../utils/getContactInfo";
import InputField from "../UI/input/inputField";

const AddChat = () => {

    const dispatch = useAppDispatch()
    const {apiTokenInstance, idInstance} = useAppSelector(accountSelector)

    const [foneNumber, setFoneNumber] = useState("")
    const inputRef = useRef(null)

    const onSetFoneNumber = (event) => {
        setFoneNumber(event.target.value)
    }
    const onClickClear = () => {
        setFoneNumber("")
        inputRef.current?.focus()
    }

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            createChat()
        }
    }

    const CheckWhatsapp = async (id) => {
        try {
            const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`,
                {
                    "phoneNumber": foneNumber
                }
            )
            // console.log(data);
            return data.existsWhatsapp

        } catch (error) {
            console.error('CheckWhatsapp', error)
            alert(`Number verification error. Read more in the console.`)
        }

    }
    //TODO для контакта чата создавать объекты с url аватара, именем и счетчиком сообщений. Диспачить уже объект.
    const createChat = () => {
        if (foneNumber) {
            const numb = Number(foneNumber)
            CheckWhatsapp(numb).then(response => {
                if (response) {
                    const id = foneNumber + "@c.us"
                    getContactInfo(id, idInstance, apiTokenInstance).then(response => {
                        const data = {
                            id,
                            avatar: response.avatar,
                            name: response.name,
                            noReadMessageCount:0
                        }
                        dispatch(addChat(data))
                        dispatch(modalOnOff())
                    }).catch(error => console.error('getContactInfo',error))

                } else {
                    alert(`this number is not registered or is incorrect`)
                }
            })
        } else {
            alert(`Please fill field`)
        }
    }

    return (
        <div className={styles.add_form}>
            <div onClick={() => dispatch(modalOnOff())} className={styles.close}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25"
                     height="25">
                    <path
                        d="M19,2H5C2.243,2,0,4.243,0,7v10c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm3,15c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V7c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v10Zm-5.793-7.793l-2.793,2.793,2.793,2.793c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.793-2.793-2.793,2.793c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.793-2.793-2.793-2.793c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.793,2.793,2.793-2.793c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z"/>
                </svg>
            </div>
            <span>
                Enter phone number
            </span>
            <div className={styles.input_fields}>
                <input
                    ref={inputRef}
                    value={foneNumber}
                    onChange={onSetFoneNumber}
                    onKeyDown={keyPress}
                    className={styles.input} placeholder="Enter phone number (without + and 8) " type="text"/>
                {
                    foneNumber && (<div onClick={onClickClear} className={styles.clear_input}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                        </svg>
                    </div>)
                }
            </div>
            {/*<InputField keyPress={keyPress} value={foneNumber} onSetValue={onSetFoneNumber} onClearInput={setFoneNumber} placeholder={'Enter phone number (without + and 8)'}/>*/}
            <div onClick={createChat} className={styles.form_button}>
                <button className={styles.add_chat}>create chat</button>
            </div>
        </div>
    );
};

export default AddChat;
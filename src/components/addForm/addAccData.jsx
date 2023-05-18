import React, {useRef, useState} from 'react';
import {useAppDispatch} from "../../redux/storeHooks";
import styles from "./addForm.module.scss";
import {logIn} from "../../redux/accaunt/slice";
import {modalOnOff} from "../../redux/modal/slice";

const AddAccData = () => {

    const dispatch = useAppDispatch()
    const [idInstance, setIdInstance] = useState("")
    const [apiTokenInstance, setApiTokenInstance] = useState("")
    const instace = useRef()
    const token = useRef()
    const login = () => {
        const data = {
            idInstance,
            apiTokenInstance,
        }
        if (idInstance !== "" && apiTokenInstance !== "") {
            dispatch(logIn(data))
            dispatch(modalOnOff())
        } else {
            alert(`Please fill all fields`)
        }
    }

    const onClickForm = () => {
        setIdInstance("")
        setApiTokenInstance("")
    }
    const onChangeId = (event) => {
        setIdInstance(event.target.value)
    }
    const onChangeToken = (event) => {
        setApiTokenInstance(event.target.value)
    }
    const keyPress = (event) => {
        if (event.key === 'Enter') {
            login()
        }
    }
    const onClickClearInput = (event) => {
        console.log(event);
        if (event) {
            setIdInstance("")
            instace.current?.focus()
        } else {
            setApiTokenInstance("")
            token.current?.focus()
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
                Enter yours idInstance
            </span>
            <div className={styles.input_fields}>
                <input
                    ref={instace}
                    value={idInstance}
                    onChange={onChangeId}
                    onKeyDown={keyPress}
                    className={styles.input} placeholder="Enter idInstance" type="text"/>
                {
                    idInstance && (<div onClick={() => onClickClearInput(true)} className={styles.clear_input}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                        </svg>
                    </div>)
                }
            </div>
            <span>
                Enter yours apiTokenInstance
            </span>
            <div className={styles.input_fields}>
                <input
                    ref={token}
                    value={apiTokenInstance}
                    onChange={onChangeToken}
                    onKeyDown={keyPress}
                    className={styles.input} placeholder="Enter apiTokenInstance" type="text"/>
                {
                    apiTokenInstance && (<div onClick={() => onClickClearInput(false)} className={styles.clear_input}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                        </svg>
                    </div>)
                }
            </div>
            <div className={styles.form_button}>
                <button onClick={login}>login</button>
                <button onClick={onClickForm}>clear</button>
            </div>

        </div>
    );
};

export default AddAccData;
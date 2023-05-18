import React, {useCallback, useEffect} from 'react';
import styles from './modal.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks";
import {modalSelector} from "../../redux/modal/selector";
import {modalOnOff} from "../../redux/modal/slice";

const Modal = ({children}) => {

    const {onOff} = useAppSelector(modalSelector)
    const dispatch = useAppDispatch()

    const handleKeyPress = useCallback((event) => {
        if (event.key === "Escape") dispatch(modalOnOff())
    }, [])

    useEffect(() => {
        if (onOff) {
            document.addEventListener("keydown", handleKeyPress)
            return () => {
                document.removeEventListener("keydown", handleKeyPress)
            }
        }
    }, [handleKeyPress, onOff])

    return (
        <>
            {onOff && (
                <div onClick={() => dispatch(modalOnOff())} className={styles.modal}>
                    <div className={styles.modalContent} onClick={event => event.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
import React, {useRef} from 'react';
import styles from "./inputField.module.scss";

const InputField = ({value, onSetValue, keyPress, onClearInput, placeholder}) => {

    const inputRef = useRef(null)

    const onClickClear = () => {
        onClearInput("")
        inputRef.current?.focus()
    }

    return (
        <>
            <div className={styles.input_fields}>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={onSetValue}
                    onKeyDown={keyPress}
                    placeholder={placeholder} type="text"/>
                {
                    value && (<div onClick={onClickClear} className={styles.clear_input}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                        </svg>
                    </div>)
                }
            </div>
        </>
    );
};

export default InputField;
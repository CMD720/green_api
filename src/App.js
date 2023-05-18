import React, {useEffect, useRef} from 'react';
import './App.scss'
import Main from "./components/main/main.jsx";
import {useAppSelector} from "./redux/storeHooks";
import {accountSelector} from "./redux/accaunt/selector";
import Home from "./components/home/home";
import {chatsSelector} from "./redux/chat/selectors";

const App = () => {

    const accData = useAppSelector(accountSelector)
    const chatId = useAppSelector(chatsSelector)
    const {logged} = useAppSelector(accountSelector)
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            const jsonAccData = JSON.stringify(accData)
            const jsonChatData = JSON.stringify(chatId)

            localStorage.setItem('accData', jsonAccData)
            localStorage.setItem('chatData', jsonChatData)
        }
        isMounted.current = true
    }, [accData.logged, chatId])

    return (
        <div className='App'>
            {
                !logged
                    ? <Home/>
                    : <Main/>
            }
        </div>
    );
};

export default App;
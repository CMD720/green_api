import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {Provider} from "react-redux";
import {setupStore} from "./redux/store";

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </StrictMode>

);


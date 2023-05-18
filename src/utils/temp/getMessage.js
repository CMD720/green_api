import axios from "axios";
import {apiTokenInstance, idInstance} from "./consts.js";


const getMessage = async (chatId, idMessage) => {

    const messageData = {
        "chatId": chatId,
        "idMessage": idMessage
    }

    await axios.post(`https://api.green-api.com/waInstance${idInstance}/getMessage/${apiTokenInstance}`,
        {
            ...messageData
        }
    )
        .then(function (response) {
            console.log('GET_MESSAGE', response.data);
            // return response.data
        })
        .catch(function (error) {
            console.log('GET_MESSAGE', error);
        });
}
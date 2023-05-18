import axios from "axios";
import {apiTokenInstance, idInstance} from "./consts.js";


export const getChatHistorys = async (chatId) => {

    const chatHistory = {
        "chatId": chatId,
    }

    const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
        {
            ...chatHistory
        }
    ).catch(error => console.log('Get_Chat_History', error) );
    return data
}

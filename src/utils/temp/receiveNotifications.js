import axios from "axios";
import {apiTokenInstance, idInstance} from "./consts.js";


export const receiveNotifications = async () => {
    try {
        const {data} = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
        console.log('Проверяем входящие')
        return data
    }catch (e) {
        console.error(e)
    }
}

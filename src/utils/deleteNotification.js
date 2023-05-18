import axios from "axios";
// import {apiTokenInstance, idInstance} from "./consts.js";

export const deleteNotification = async (receiptId, apiTokenInstance, idInstance) => {
    // console.log(receiptId);
    try {
        await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
        console.log('Заявка удалена - ', receiptId);
    } catch (error) {
        console.error('DeleteNotification',error);
    }
}
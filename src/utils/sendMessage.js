import axios from "axios";

export const sendMessage = async (chatId, textMessage, apiTokenInstance, idInstance) => {
    const messageData = {
        "chatId": chatId,
        "message": textMessage,
    }
    try {
        await axios.post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
            {
                ...messageData
            }
        )
        // console.log('Сообщение отправлено')
    } catch (error) {
        console.error('SendMessage',error)
    }


}
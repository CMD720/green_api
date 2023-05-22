import axios from "axios";

export const getContactInfo = async (chatId, idInstance, apiTokenInstance) => {
    try {
        const {data} = await axios.post(`https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
            {
                "chatId": chatId,
            }
        )
        return data
    }catch (e) {
        console.error(e)
    }
}
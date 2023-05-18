import axios from "axios";

export const getSettings = async(apiTokenInstance, idInstance) => {
    try {
        const {data} = await axios.get(`https://api.green-api.com/waInstance${idInstance}/GetSettings/${apiTokenInstance}`)
        // console.log('GetSettings',data);
        return data
    }catch (e) {
        console.error('GetSettings',e)
    }
}
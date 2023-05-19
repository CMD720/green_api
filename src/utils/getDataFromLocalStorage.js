

export const getAccLocalStorage = () => {
    const data = localStorage.getItem('accData')

    return data ? JSON.parse(data) :{idInstance: "", apiTokenInstance: "", logged: false}
}
export const getChatLocalStorage = () => {
    const data = localStorage.getItem('chatData')

    return data ? JSON.parse(data) :{chatId: []}
}

export const CurrentChat = () => {

}


export const getAccLocalStorage = () => {
    const data = localStorage.getItem('accData')

    return data ? JSON.parse(data) :{idInstance: "", apiTokenInstance: "", logged: false, wid:"", avatarURL:"", name:""}
}
export const getChatLocalStorage = () => {
    const data = localStorage.getItem('chatData')

    return data ? JSON.parse(data) :{chats: [], currentChat:{id:"", avatar:"", name:"", noReadMessageCount:0}}
}

export const CurrentChat = () => {

}
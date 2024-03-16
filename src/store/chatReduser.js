const defaultState = {
    chats: [],
    isOpen: false,
    isOnChat: false,
    chatId: null,
}

// типы actions
export const GET_CHATS = 'GET_CHATS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const UPDATE_STATUS_MESSAGE = 'UPDATE_STATUS_MESSAGE'
export const OPEN_CHATS = "OPEN_CHATS"
export const OPEN_THE_CHAT = "OPEN_THE_CHAT"
export const SEND_CAR_MESSAGE = "SEND_CAR_MESSAGE"

// типы actions saga
export const GET_CHATS_FETCH = 'GET_CHATS_FETCH'
export const SEND_MESSAGE_FETCH = 'SEND_MESSAGE_FETCH'
export const UPDATE_STATUS_MESSAGE_FETCH = 'UPDATE_STATUS_MESSAGE_FETCH'
export const SEND_CAR_MESSAGE_FETCH = "SEND_CAR_MESSAGE_FETCH"

export const chatReduser = (state=defaultState, action) => {
    switch (action.type) {
        case GET_CHATS:
            return {...state, chats: action.payload}
        case SEND_MESSAGE:
            const chats = state.chats
            const chat = chats.find(chat => chat.id === action.payload.chat_id)
            chat.messages.push(action.payload.message)
            return {...state, chats: chats}
        case UPDATE_STATUS_MESSAGE:
            const chats2 = state.chats   // копируем объект
            const chat2 = chats2.find(chat => chat.id === action.payload.chat_id)
            const message2 = chat2.messages.find(msg => msg.id === action.payload.message.id)
            if (message2) {
                message2.status = true;
            }
           return {...state, chats: chats2}
        case OPEN_CHATS:
            return {...state, isOpen: action.payload}
        case OPEN_THE_CHAT:
            return {
                ...state,
                isOnChat: action.payload.isOnChat,
                chatId: action.payload.chat_id
            }
        case SEND_CAR_MESSAGE:
            const chats3 = state.chats
            const chat3 = chats3.find(chat => chat.id === action.payload.chat_id)
            if (!chat3) chats3.push({
                id: action.payload.chat_id,
                users: action.payload.users,
                messages: [
                    action.payload.message,
                ]
            })
            else chat3.messages.push(action.payload.message)
            return {...state, chats: chats3, isOpen: true, isOnChat: true, chatId: action.payload.chat_id}
       default:
           return state
   }
}

// Action-creators
export const get_chats = payload => ({type: GET_CHATS, payload})
export const send_message = payload => ({type: SEND_MESSAGE, payload})
export const update_status_message = payload => ({type: UPDATE_STATUS_MESSAGE, payload})
export const open_chats = payload => ({type: OPEN_CHATS, payload})
export const open_the_chat = payload => ({type: OPEN_THE_CHAT, payload})
export const send_car_message = payload => ({type: SEND_CAR_MESSAGE, payload})

// Action-creators for saga
export const get_chats_fetch = payload => ({type: GET_CHATS_FETCH, payload})
export const send_message_fetch = payload => ({type: SEND_MESSAGE_FETCH, payload})
export const update_status_message_fetch = payload => ({type: UPDATE_STATUS_MESSAGE_FETCH, payload})
export const send_car_message_fetch = payload => ({type: SEND_CAR_MESSAGE_FETCH, payload})
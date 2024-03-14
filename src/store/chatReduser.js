const defaultState = {
    chats: [],
}

// типы actions
export const GET_CHATS = 'GET_CHATS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const UPDATE_STATUS_MESSAGE = 'UPDATE_STATUS_MESSAGE'

// типы actions saga
export const GET_CHATS_FETCH = 'GET_CHATS_FETCH'
export const SEND_MESSAGE_FETCH = 'SEND_MESSAGE_FETCH'
export const UPDATE_STATUS_MESSAGE_FETCH = 'UPDATE_STATUS_MESSAGE_FETCH'

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
            const chats2 = state.chats.slice()   // копируем объект
            for (let chat of chats2) {
                const message = chat.messages.find(msg => msg.id === action.payload.message.id);
                if (message) {
                    message.status = true;
                }
            }
           return {...state, chats: chats2}
       default:
           return state
   }
}

// Action-creators
export const get_chats = payload => ({type: GET_CHATS, payload})
export const send_message = payload => ({type: SEND_MESSAGE, payload})
export const update_status_message = payload => ({type: UPDATE_STATUS_MESSAGE, payload})

// Action-creators for saga
export const get_chats_fetch = payload => ({type: GET_CHATS_FETCH, payload})
export const send_message_fetch = payload => ({type: SEND_MESSAGE_FETCH, payload})
export const update_status_message_fetch = payload => ({type: UPDATE_STATUS_MESSAGE_FETCH, payload})
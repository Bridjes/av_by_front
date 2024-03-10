const defaultState = {
    chats: [],
}

// типы actions
export const GET_CHATS = 'GET_CHATS'
export const SEND_MESSAGE = 'SEND_MESSAGE'

// типы actions saga
export const GET_CHATS_FETCH = 'GET_CHATS_FETCH'
export const SEND_MESSAGE_FETCH = 'SEND_MESSAGE_FETCH'

export const chatReduser = (state=defaultState, action) => {
   switch (action.type) {
       case GET_CHATS:
           return {...state, chats: action.payload}
       case SEND_MESSAGE:
           return {...state}
       default:
           return state
   }
}

// Action-creators
export const get_chats = payload => ({type: GET_CHATS, payload})
export const send_message = payload => ({type: SEND_MESSAGE, payload})

// Action-creators for saga
export const get_chats_fetch = payload => ({type: GET_CHATS_FETCH, payload})
export const send_message_fetch = payload => ({type: SEND_MESSAGE_FETCH, payload})
const defaultState = {
    user_info: {},
}

// типы actions
export const RETRIEVE = 'RETRIEVE'

// типы actions saga
export const RETRIEVE_FETCH = 'RETRIEVE_FETCH'

// записывалка в кеш-хранилище
export const curentUserInfoReduser = (state=defaultState, action) => {
   switch (action.type) {
       case RETRIEVE:
           return {...state, user_info: action.payload}
       default:
           return state
   }
}

// Action-creators
export const retrieve = payload => ({type: RETRIEVE, payload})

// Action-creators for saga
export const retrieve_fetch = payload => ({type: RETRIEVE_FETCH, payload})

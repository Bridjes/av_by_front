const defaultState = {
    cars: [],
    current_car: {},
    own_cars: [],
    status: false,
}

// типы actions
export const LOAD_CARS = 'LOAD_CARS'
export const LOAD_CARS_PK = 'LOAD_CARS_PK'
export const LOAD_CARS_OWN = 'LOAD_CARS_OWN'
export const SET_STATUS_CARS = 'SET_STATUS_CARS'

// типы actions saga
export const LOAD_CAR_FETCH = "LOAD_CAR_FETCH"
export const LOAD_CAR_PK_FETCH = "LOAD_CAR_PK_FETCH"
export const LOAD_CAR_OWN_FETCH = "LOAD_CAR_OWN_FETCH"
export const CREATE_CAR_FETCH = "CREATE_CAR_FETCH"

// записывалка в кеш-хранилище
export const carReduser = (state=defaultState, action) => {
   switch (action.type) {
       case LOAD_CARS:
           return {...state, cars: action.payload}
       case LOAD_CARS_PK:
           return {...state, current_car: action.payload}
       case LOAD_CARS_OWN:
           return {...state, own_cars: action.payload}
       case SET_STATUS_CARS:
           return {...state, status: action.payload}
       default:
           return state
   }
}

// Action-creators
export const load_cars = payload => ({type: LOAD_CARS, payload})
export const load_cars_pk = payload => ({type: LOAD_CARS_PK, payload})
export const load_cars_own = payload => ({type: LOAD_CARS_OWN, payload})
export const set_status_cars = payload => ({type: SET_STATUS_CARS, payload})

// Action-creators for saga
export const load_car_fetch = payload => ({type: LOAD_CAR_FETCH, payload})
export const load_car_pk_fetch = payload => ({type: LOAD_CAR_PK_FETCH, payload})
export const load_car_own_fetch = payload => ({type: LOAD_CAR_OWN_FETCH, payload})
export const create_car_fetch = payload => ({type: CREATE_CAR_FETCH, payload})

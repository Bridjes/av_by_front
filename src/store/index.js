import {createStore, combineReducers, applyMiddleware} from "redux";
import {curentUserReduser} from "./curentUserReduser";
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../saga";
import {carReduser} from "./carReduser";
import {curentUserInfoReduser} from "./curentUserInfoReduser";
import {chatReduser} from "./chatReduser";

const sagaMiddleware = createSagaMiddleware()

// объединяем все редьюсеры в один
const rootReduser = combineReducers({
    user: curentUserReduser,
    user_info: curentUserInfoReduser,
    user_chat: chatReduser,
    cars: carReduser,
})

export const store = createStore(rootReduser, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)
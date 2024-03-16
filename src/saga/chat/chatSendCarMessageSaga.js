import {put, takeEvery, call} from "redux-saga/effects"
import {SEND_CAR_MESSAGE_FETCH, send_car_message} from "../../store/chatReduser";
import ChatServices from "../../services/ChatServices";

function* chatSendCarMessageSaga(action) {
    try {
        const response = yield call(ChatServices.send_message, action.payload.text, action.payload.user_id)

        // const message = {
        //     "user_create": {
        //         "username": action.payload.user_create.username,
        //         "photo": action.payload.user_create.photo
        //     },
        //     "text": action.payload.text,
        // }
        // const message_obj = {
        //     message: message,
        //     chat_id: response.data.chat_id
        // }
        yield put(send_car_message(response.data))
    } catch (e) {
        yield put(send_car_message(null))
    }
}

export function* chatSendCarMessageWatch() {
  yield takeEvery(SEND_CAR_MESSAGE_FETCH, chatSendCarMessageSaga);
}
import {put, takeEvery, call} from "redux-saga/effects"
import {SEND_MESSAGE_FETCH, send_message} from "../../store/chatReduser";
import ChatServices from "../../services/ChatServices";

function* chatSendMessageSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(ChatServices.send_message, action.payload.text, action.payload.user_id)
        action.payload.setIsLoading(false)

        const message = {
            "user_create": {
                "username": action.payload.user_create.username,
                "photo": action.payload.user_create.photo
            },
            "text": action.payload.text,
        }
        const message_obj = {
            message: message,
            chat_id: action.payload.chat_id
        }
        yield put(send_message(message_obj))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(send_message(null))
    }
}

export function* chatSendMessageWatch() {
  yield takeEvery(SEND_MESSAGE_FETCH, chatSendMessageSaga);
}
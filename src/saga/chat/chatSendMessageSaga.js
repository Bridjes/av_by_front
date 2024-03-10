import {put, takeEvery, call} from "redux-saga/effects"
import {SEND_MESSAGE_FETCH, send_message} from "../../store/chatReduser";
import ChatServices from "../../services/ChatServices";

function* chatSendMessageSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(ChatServices.send_message, action.payload.text, action.payload.user_id)
        action.payload.setIsLoading(false)
        yield put(send_message(response.data))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(send_message([]))
    }
}

export function* chatSendMessageWatch() {
  yield takeEvery(SEND_MESSAGE_FETCH, chatSendMessageSaga);
}
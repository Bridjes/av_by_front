import {put, takeEvery, call} from "redux-saga/effects"
import {UPDATE_STATUS_MESSAGE_FETCH, update_status_message} from "../../store/chatReduser";
import ChatServices from "../../services/ChatServices";

function* chatUpdateStatusMessageSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(ChatServices.update_message_status, action.payload.status, action.payload.pk)
        action.payload.setIsLoading(false)
        const message_obj = {
            message: response.data,
            chat_id: action.payload.chat_id
        }
        yield put(update_status_message(message_obj))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(update_status_message({}))
    }
}

export function* chatUpdateStatusMessageWatch() {
  yield takeEvery(UPDATE_STATUS_MESSAGE_FETCH, chatUpdateStatusMessageSaga);
}
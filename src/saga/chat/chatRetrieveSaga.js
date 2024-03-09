import {put, takeEvery, call} from "redux-saga/effects"
import {GET_CHATS_FETCH, get_chats} from "../../store/chatReduser";
import ChatServices from "../../services/ChatServices";

function* chatRetrieveSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(ChatServices.get_chats)
        action.payload.setIsLoading(false)
        yield put(get_chats(response.data))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(get_chats([]))
    }
}

export function* chatRetrieveWatch() {
  yield takeEvery(GET_CHATS_FETCH, chatRetrieveSaga);
}
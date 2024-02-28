import {put, takeEvery, call} from "redux-saga/effects"
import AuthService from "../../services/AuthServices";
import {retrieve, RETRIEVE_FETCH} from "../../store/curentUserInfoReduser";

function* userRetrieveSaga(action) {
    try {
        const access = localStorage.getItem('access');

        action.payload.setIsLoading(true)
        const response = yield call(AuthService.retrieve, access);
        action.payload.setIsLoading(false)

        const user_info = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            photo: response.data.photo,
            is_telegram_use: response.data.is_telegram_use,
            telegram_id: response.data.telegram_id,
        }
        yield put(retrieve(user_info));
    } catch (error) {
        console.log(error);
        action.payload.setIsLoading(false)
        yield put(retrieve({}));
    }
}

export function* userRetrieveWatch() {
  yield takeEvery(RETRIEVE_FETCH, userRetrieveSaga);
}
import {put, takeEvery, call} from "redux-saga/effects"
import CarServices from "../../services/CarServices";
import {load_cars_own, LOAD_CAR_OWN_FETCH} from "../../store/carReduser";

function* carRetrieveOwnSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(CarServices.load_own_cars)
        action.payload.setIsLoading(false)
        yield put(load_cars_own(response.data))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(load_cars_own([]))
    }
}

export function* carRetrieveOwnWatch() {
  yield takeEvery(LOAD_CAR_OWN_FETCH, carRetrieveOwnSaga);
}
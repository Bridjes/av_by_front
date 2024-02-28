import {put, takeEvery, call} from "redux-saga/effects"
import CarServices from "../../services/CarServices";
import {LOAD_CAR_PK_FETCH, load_cars_pk} from "../../store/carReduser";

function* carRetrievePKSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const response = yield call(CarServices.load_cars_pk, action.payload.pk)
        action.payload.setIsLoading(false)
        yield put(load_cars_pk(response.data))
    } catch (e) {
        action.payload.setIsLoading(false)
        yield put(load_cars_pk({}))
    }
}

export function* carRetrievePKWatch() {
  yield takeEvery(LOAD_CAR_PK_FETCH, carRetrievePKSaga);
}
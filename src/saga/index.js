import {all} from "redux-saga/effects"
import {userLoginWatch} from "./users/userLoginSaga";
import {userRegisterWatch} from "./users/userRegisterSaga";
import {userLogoutWatch} from "./users/userLogoutSaga";
import {userCheckAuthWatch} from "./users/userCheckAuthSaga";
import {carRetrieveWatch} from "./cars/carRetrieveSaga";
import {carRetrievePKWatch} from "./cars/carRetrievePKSaga";
import {carCreateWatch} from "./cars/carCreateSaga";
import {userRetrieveWatch} from "./user_info/userRetrieveSaga";
import {carRetrieveOwnWatch} from "./cars/carRetrieveOwnSaga";
import {chatRetrieveWatch} from "./chat/chatRetrieveSaga";

export function* rootWatcher() {
    yield all([
        userLoginWatch(),
        userRegisterWatch(),
        userLogoutWatch(),
        userCheckAuthWatch(),

        userRetrieveWatch(),

        chatRetrieveWatch(),

        carRetrieveWatch(),
        carRetrievePKWatch(),
        carCreateWatch(),
        carRetrieveOwnWatch(),
    ])
}
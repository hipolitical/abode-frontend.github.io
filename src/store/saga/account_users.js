import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_ACCOUNT_USERS_REQUESTED,
  GET_ACCOUNT_USERS_FAILED,
  GET_ACCOUNT_USERS_SUCCESS,
} from "../types";
import { getAccountUsers } from '../../api';

function* getAccountUsersRequested({ id }) {
  try {
    const payload = yield call(getAccountUsers, id);
    yield put({ type: GET_ACCOUNT_USERS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ACCOUNT_USERS_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_ACCOUNT_USERS_REQUESTED, getAccountUsersRequested);
}


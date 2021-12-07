import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_ACCOUNTS_REQUESTED,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
} from "../types";
import { getAccounts } from '../../api';

function* getAccountsRequested() {
  try {
    const payload = yield call(getAccounts);
    yield put({ type: GET_ACCOUNTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ACCOUNTS_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_ACCOUNTS_REQUESTED, getAccountsRequested);
}


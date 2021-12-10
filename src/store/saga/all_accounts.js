import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_ALL_ACCOUNTS_REQUESTED,
  GET_ALL_ACCOUNTS_FAILED,
  GET_ALL_ACCOUNTS_SUCCESS,
} from "../types";
import { getAllAccounts } from '../../api';

function* getAllAccountsRequested() {
  try {
    const payload = yield call(getAllAccounts);
    yield put({ type: GET_ALL_ACCOUNTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ALL_ACCOUNTS_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_ALL_ACCOUNTS_REQUESTED, getAllAccountsRequested);
}


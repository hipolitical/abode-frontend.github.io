import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_MY_ACCOUNTS_REQUESTED,
  GET_MY_ACCOUNTS_FAILED,
  GET_MY_ACCOUNTS_SUCCESS,
} from "../types";
import { getMyAccounts } from '../../api';

function* getMyAccountsRequested({ id }) {
  try {
    const payload = yield call(getMyAccounts, id);
    yield put({ type: GET_MY_ACCOUNTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_MY_ACCOUNTS_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_MY_ACCOUNTS_REQUESTED, getMyAccountsRequested);
}


import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_SINGLE_ACCOUNT_REQUESTED,
  GET_SINGLE_ACCOUNT_FAILED,
  GET_SINGLE_ACCOUNT_SUCCESS,
} from "../types";
import { getSingleAccount } from '../../api';

function* getSingleAccountRequested({ id }) {
  try {
    const payload = yield call(getSingleAccount, id);
    yield put({ type: GET_SINGLE_ACCOUNT_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_SINGLE_ACCOUNT_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_SINGLE_ACCOUNT_REQUESTED, getSingleAccountRequested);
}


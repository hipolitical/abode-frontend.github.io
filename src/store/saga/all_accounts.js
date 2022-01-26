import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_ALL_ACCOUNTS_REQUESTED,
  GET_ALL_ACCOUNTS_FAILED,
  GET_ALL_ACCOUNTS_SUCCESS,
  CREATE_REQUEST_REQUESTED,
  CREATE_REQUEST_FAILED,
  CREATE_REQUEST_SUCCESS,
  CANCEL_REQUEST_REQUESTED,
  CANCEL_REQUEST_FAILED,
  CANCEL_REQUEST_SUCCESS,
} from "../types";
import {
  getAllAccounts,
  createRequest,
  cancelRequest,
} from '../../api';

function* getAllAccountsRequested({ params }) {
  try {
    const payload = yield call(getAllAccounts, params);
    yield put({ type: GET_ALL_ACCOUNTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ALL_ACCOUNTS_FAILED, payload: e });
  }
}

function* createRequestHandler({ params }) {
  try {
    const payload = yield call(createRequest, params);
    yield put({ type: CREATE_REQUEST_SUCCESS, payload, params });
  } catch (e) {
    yield put({ type: CREATE_REQUEST_FAILED, payload: e });
  }
}

function* cancelRequestHandler({ params }) {
  try {
    const payload = yield call(cancelRequest, params);
    yield put({ type: CANCEL_REQUEST_SUCCESS, payload, params });
  } catch (e) {
    yield put({ type: CANCEL_REQUEST_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_ALL_ACCOUNTS_REQUESTED, getAllAccountsRequested);
  yield takeEvery(CREATE_REQUEST_REQUESTED, createRequestHandler);
  yield takeEvery(CANCEL_REQUEST_REQUESTED, cancelRequestHandler);
}


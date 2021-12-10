import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_MY_CLIENTS_REQUESTED,
  GET_MY_CLIENTS_FAILED,
  GET_MY_CLIENTS_SUCCESS,
  ADD_CLIENT_ACCOUNT_REQUESTED,
  ADD_CLIENT_ACCOUNT_FAILED,
  ADD_CLIENT_ACCOUNT_SUCCESS,
  UPDATE_CLIENT_ACCOUNT_REQUESTED,
  UPDATE_CLIENT_ACCOUNT_FAILED,
  UPDATE_CLIENT_ACCOUNT_SUCCESS,
} from "../types";
import { getMyClients } from '../../api';

function* getMyClientsRequested() {
  try {
    const payload = yield call(getMyClients);
    yield put({ type: GET_MY_CLIENTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_MY_CLIENTS_FAILED, payload: e });
  }
}

function* addClientAccountRequested({ account }) {
  try {
    const payload = account;
    yield put({ type: ADD_CLIENT_ACCOUNT_SUCCESS, payload });
  } catch (e) {
    yield put({ type: ADD_CLIENT_ACCOUNT_FAILED, payload: e });
  }
}

function* updateClientAccountRequested({ account }) {
  try {
    const payload = account;
    yield put({ type: UPDATE_CLIENT_ACCOUNT_SUCCESS, payload });
  } catch (e) {
    yield put({ type: UPDATE_CLIENT_ACCOUNT_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_MY_CLIENTS_REQUESTED, getMyClientsRequested);
  yield takeEvery(ADD_CLIENT_ACCOUNT_REQUESTED, addClientAccountRequested);
  yield takeEvery(UPDATE_CLIENT_ACCOUNT_REQUESTED, updateClientAccountRequested);
}


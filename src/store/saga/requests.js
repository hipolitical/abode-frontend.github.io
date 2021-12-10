import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_REQUESTS_REQUESTED,
  GET_REQUESTS_FAILED,
  GET_REQUESTS_SUCCESS,
} from "../types";
import { getRequests } from '../../api';

function* getAllRequestsRequested() {
  try {
    const payload = yield call(getRequests);
    yield put({ type: GET_REQUESTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_REQUESTS_FAILED, payload: e });
  }
}

export default function* accounts() {
  yield takeEvery(GET_REQUESTS_REQUESTED, getAllRequestsRequested);
}


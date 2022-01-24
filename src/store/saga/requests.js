import { takeEvery, call, put } from 'redux-saga/effects';
import { format } from 'date-fns';
import {
  GET_REQUESTS_REQUESTED,
  GET_REQUESTS_FAILED,
  GET_REQUESTS_SUCCESS,
  GRANT_ACCESS_REQUESTED,
  GRANT_ACCESS_SUCCESS,
  GRANT_ACCESS_FAILED,
  DECLINE_ACCESS_REQUESTED,
  DECLINE_ACCESS_SUCCESS,
  DECLINE_ACCESS_FAILED,
  ADD_NOTIFICATION_REQUESTED,
} from "../types";
import {
  getRequests,
  grantAccess,
  declineAccess,
} from '../../api';

function* getAllRequestsRequested({ params }) {
  try {
    const payload = yield call(getRequests, params);
    yield put({ type: GET_REQUESTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_REQUESTS_FAILED, payload: e });
  }
}

function* grantAccessRequested({ params }) {
  try {
    const payload = yield call(grantAccess, params);
    yield put({ type: GRANT_ACCESS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GRANT_ACCESS_FAILED, payload: e });
  }
}

function* declineAccessRequested({ params }) {
  try {
    const payload = yield call(declineAccess, params);
    yield put({ type: DECLINE_ACCESS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: DECLINE_ACCESS_FAILED, payload: e });
    yield put({
      type: ADD_NOTIFICATION_REQUESTED,
      data: {
        message: 'Decline access failed',
        date: format(new Date(), 'HH:mm:ss MM/dd/yyyy'),
        isRead: false,
        type: 'error',
      }
    });
  }
}

export default function* requests() {
  yield takeEvery(GET_REQUESTS_REQUESTED, getAllRequestsRequested);
  yield takeEvery(GRANT_ACCESS_REQUESTED, grantAccessRequested);
  yield takeEvery(DECLINE_ACCESS_REQUESTED, declineAccessRequested);
}


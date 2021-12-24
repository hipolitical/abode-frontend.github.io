import { takeEvery, put } from 'redux-saga/effects';
import {
  ADD_NOTIFICATION_REQUESTED,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILED,
} from "../types";

function* addNotificationsRequested({ data }) {
  try {
    yield put({ type: ADD_NOTIFICATION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ADD_NOTIFICATION_FAILED, payload: e });
  }
}

export default function* notifications() {
  yield takeEvery(ADD_NOTIFICATION_REQUESTED, addNotificationsRequested);
}


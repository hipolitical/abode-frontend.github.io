import { takeEvery, put } from 'redux-saga/effects';
import {
  ADD_NOTIFICATION_REQUESTED,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILED,
  SET_NOTIFICATIONS_READ_REQUESTED,
  SET_NOTIFICATIONS_READ_SUCCESS,
  SET_NOTIFICATIONS_READ_FAILED,
} from "../types";

function* addNotificationsRequested({ data }) {
  try {
    yield put({ type: ADD_NOTIFICATION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ADD_NOTIFICATION_FAILED, payload: e });
  }
}

function* setNotificationsReadRequested() {
  try {
    yield put({ type: SET_NOTIFICATIONS_READ_SUCCESS });
  } catch (e) {
    yield put({ type: SET_NOTIFICATIONS_READ_FAILED });
  }
}


export default function* notifications() {
  yield takeEvery(ADD_NOTIFICATION_REQUESTED, addNotificationsRequested);
  yield takeEvery(SET_NOTIFICATIONS_READ_REQUESTED, setNotificationsReadRequested);
}


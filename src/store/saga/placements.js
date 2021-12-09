import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_PLACEMENTS_REQUESTED,
  GET_PLACEMENTS_FAILED,
  GET_PLACEMENTS_SUCCESS,
  ADD_PLACEMENT_REQUESTED,
  ADD_PLACEMENT_FAILED,
  ADD_PLACEMENT_SUCCESS,
  UPDATE_PLACEMENT_REQUESTED,
  UPDATE_PLACEMENT_FAILED,
  UPDATE_PLACEMENT_SUCCESS,
} from "../types";
import { getPlacements } from '../../api';

function* getPlacementsRequested() {
  try {
    const payload = yield call(getPlacements);
    yield put({ type: GET_PLACEMENTS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_PLACEMENTS_FAILED, payload: e });
  }
}

function* addPlacementRequested({ placement }) {
  try {
    const payload = placement;
    yield put({ type: ADD_PLACEMENT_SUCCESS, payload });
  } catch (e) {
    yield put({ type: ADD_PLACEMENT_FAILED, payload: e });
  }
}

function* updatePlacementRequested({ placement }) {
  try {
    const payload = placement;
    yield put({ type: UPDATE_PLACEMENT_SUCCESS, payload });
  } catch (e) {
    yield put({ type: UPDATE_PLACEMENT_FAILED, payload: e });
  }
}

export default function* placements() {
  yield takeEvery(GET_PLACEMENTS_REQUESTED, getPlacementsRequested);
  yield takeEvery(ADD_PLACEMENT_REQUESTED, addPlacementRequested);
  yield takeEvery(UPDATE_PLACEMENT_REQUESTED, updatePlacementRequested);
}


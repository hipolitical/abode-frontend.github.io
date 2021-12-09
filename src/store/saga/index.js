import { all } from 'redux-saga/effects';
import accounts from './accounts';
import placements from './placements';

export default function* Saga() {
  yield all([
    accounts(),
    placements(),
  ]);
}

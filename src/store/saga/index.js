import { all } from 'redux-saga/effects';
import accounts from './accounts';

export default function* Saga() {
  yield all([
    accounts(),
  ]);
}

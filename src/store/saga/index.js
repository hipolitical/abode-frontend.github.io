import { all } from 'redux-saga/effects';
import accounts from './accounts';
import all_accounts from './all_accounts';
import requests from './requests';
import placements from './placements';

export default function* Saga() {
  yield all([
    accounts(),
    all_accounts(),
    requests(),
    placements(),
  ]);
}

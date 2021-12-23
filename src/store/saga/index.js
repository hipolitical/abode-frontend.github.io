import { all } from 'redux-saga/effects';
import accounts from './accounts';
import single_account from './single_account';
import all_accounts from './all_accounts';
import requests from './requests';
import account_users from './account_users';
import placements from './placements';

export default function* Saga() {
  yield all([
    accounts(),
    single_account(),
    all_accounts(),
    requests(),
    account_users(),
    placements(),
  ]);
}

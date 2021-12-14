import { combineReducers } from 'redux';
import theme from './themeStore';
import single_account from './single_account';
import accounts from './accounts';
import all_accounts from './all_accounts';
import requests from './requests';
import placements from './placements';

export default combineReducers({
  theme,
  single_account,
  accounts,
  all_accounts,
  requests,
  placements,
});
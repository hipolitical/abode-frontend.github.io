import { combineReducers } from 'redux';
import theme from './themeStore';
import accounts from './accounts';

export default combineReducers({
  theme,
  accounts,
});
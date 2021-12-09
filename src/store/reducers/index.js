import { combineReducers } from 'redux';
import theme from './themeStore';
import accounts from './accounts';
import placements from './placements';

export default combineReducers({
  theme,
  accounts,
  placements,
});
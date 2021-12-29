import {
  ADD_NOTIFICATION_REQUESTED,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILED,
  SET_NOTIFICATIONS_READ_REQUESTED,
  SET_NOTIFICATIONS_READ_SUCCESS,
  SET_NOTIFICATIONS_READ_FAILED,
} from "../types";

const initialState = {
  notifications: [],
  isLoading: false,
};

function notificationsAllReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION_REQUESTED:
    case ADD_NOTIFICATION_FAILED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ADD_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        notifications: [
          action.payload,
          ...state.notifications,
        ],
        isLoading: false,
      });
    case SET_NOTIFICATIONS_READ_REQUESTED:
    case SET_NOTIFICATIONS_READ_FAILED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case SET_NOTIFICATIONS_READ_SUCCESS:
      return Object.assign({}, state, {
        notifications: state.notifications.map(notification => ({
          ...notification,
        })),
        isLoading: false,
      });
    default: return state;
  }
}

export default notificationsAllReducer;
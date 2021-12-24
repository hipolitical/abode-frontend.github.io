import {
  ADD_NOTIFICATION_REQUESTED,
  SET_NOTIFICATIONS_READ_REQUESTED,
} from "../types";

export function addNotification(data) {
  return { type: ADD_NOTIFICATION_REQUESTED, data };
}

export function setAllNotificationsRead() {
  return { type: SET_NOTIFICATIONS_READ_REQUESTED };
}
import {
  GET_ACCOUNT_USERS_REQUESTED,
  GET_ALL_USERS_REQUESTED,
} from "../types";

export function getAccountUsers(id) {
  return { type: GET_ACCOUNT_USERS_REQUESTED, id };
}

export function getAllUsers() {
  return { type: GET_ALL_USERS_REQUESTED };
}

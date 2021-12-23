import {
  GET_ACCOUNT_USERS_REQUESTED,
} from "../types";

export function getAccountUsers(id) {
  return { type: GET_ACCOUNT_USERS_REQUESTED, id };
}

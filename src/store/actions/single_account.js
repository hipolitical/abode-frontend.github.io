import {
  GET_SINGLE_ACCOUNT_REQUESTED,
} from "../types";

export function getSingleAccount(id) {
  return { type: GET_SINGLE_ACCOUNT_REQUESTED, id };
}

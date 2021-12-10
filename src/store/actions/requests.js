import {
  GET_REQUESTS_REQUESTED,
} from "../types";

export function getRequests() {
  return { type: GET_REQUESTS_REQUESTED };
}

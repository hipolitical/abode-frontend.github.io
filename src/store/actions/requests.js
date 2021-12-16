import {
  GET_REQUESTS_REQUESTED,
} from "../types";

export function getRequests(id) {
  return { type: GET_REQUESTS_REQUESTED, id };
}

import {
  GET_REQUESTS_REQUESTED,
} from "../types";

export function getRequests(params) {
  return { type: GET_REQUESTS_REQUESTED, params };
}

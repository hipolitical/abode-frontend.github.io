import {
  GET_REQUESTS_REQUESTED,
  GRANT_ACCESS_REQUESTED,
  DECLINE_ACCESS_REQUESTED,
} from "../types";

export function getRequests(params) {
  return { type: GET_REQUESTS_REQUESTED, params };
}

export function grantAccess(params) {
  return { type: GRANT_ACCESS_REQUESTED, params };
}

export function declineAccess(params) {
  return { type: DECLINE_ACCESS_REQUESTED, params };
}
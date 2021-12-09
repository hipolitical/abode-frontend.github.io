import {
  GET_PLACEMENTS_REQUESTED,
  ADD_PLACEMENT_REQUESTED,
  UPDATE_PLACEMENT_REQUESTED,
} from "../types";

export function getPlacements() {
  return { type: GET_PLACEMENTS_REQUESTED };
}

export function addPlacement(placement) {
  return { type: ADD_PLACEMENT_REQUESTED, placement };
}

export function updatePlacement(placement) {
  return { type: UPDATE_PLACEMENT_REQUESTED, placement };
}
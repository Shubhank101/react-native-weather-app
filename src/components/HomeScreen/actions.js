export const SHOW_CITY_MODAL = "SHOW_CITY_MODAL";
export const CLEAR_CITY_ADDED = "CLEAR_CITY_ADDED";

export function showCityModal() {
  return {type:SHOW_CITY_MODAL, data:null};
}

export function clearCityAdded() {
  return {type:CLEAR_CITY_ADDED, data:null};
}

export const CITY_ADDED = "CITY_ADDED";
export const CITY_MODAL_DISMISS = "CITY_MODAL_DISMISS";

export function cityAdded(city) {
  return {type:CITY_ADDED, data:city};
}

export function dismissCityPopup() {
  return {type:CITY_MODAL_DISMISS, data:null};
}

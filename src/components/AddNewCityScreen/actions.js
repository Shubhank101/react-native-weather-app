export const CITY_ADDED = "CITY_ADDED";

export function cityAdded(city) {
  return {type:CITY_ADDED, data:city};
}

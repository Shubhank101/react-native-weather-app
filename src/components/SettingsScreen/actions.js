export const DELETE_CITY = "DELETE_CITY";

export function deleteCity(city) {
  return {"type":DELETE_CITY, data:city};
}
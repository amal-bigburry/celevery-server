/**
 * Returns the distance between two location in km
 * Input is latitude and logitude of both location
 */
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  const rounded = Math.floor(distance * 10) / 10;
  return rounded;
}
/**
 * Returns the degree for the calculation
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
/**
 * Export the getDistanceFromLatLonInKm function
 */
export default getDistanceFromLatLonInKm;

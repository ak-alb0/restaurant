export const RADIUS_METERS = 1000;

const EARTH_RADIUS_METERS = 6371000;

function toRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

export function distanceInMeters(from, to) {
	const dLat = toRadians(to.lat - from.lat);
	const dLng = toRadians(to.lng - from.lng);

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2;

	return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a));
}
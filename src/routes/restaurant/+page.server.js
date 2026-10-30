import { getPublishedRestaurants } from './database.js';
import { distanceInMeters, RADIUS_METERS } from '#lib/distance.js';
import { geocode } from '#lib/server/geocode.js';

const MAX_ADDRESS_LENGTH = 200;

export async function load({ url, fetch }) {
	const adresse = (url.searchParams.get('adresse') ?? '').trim();
	const allRestaurants = getPublishedRestaurants();

	const withoutSearch = { restaurants: allRestaurants, adresse, centre: null, erreur: '' };

	if (adresse === '') {
		return withoutSearch;
	}

	if (adresse.length > MAX_ADDRESS_LENGTH) {
		return { ...withoutSearch, erreur: 'Adresse trop longue' };
	}

	let centre;

	try {
		centre = await geocode(adresse, fetch);
	} catch {
		return { ...withoutSearch, erreur: "La recherche d'adresse a échoué" };
	}

	if (!centre) {
		return { ...withoutSearch, erreur: 'Adresse introuvable' };
	}

	const restaurants = allRestaurants
		.map((restaurant) => ({
			...restaurant,
			distance: distanceInMeters(centre, { lat: restaurant.latitude, lng: restaurant.longitude })
		}))
		.filter((restaurant) => restaurant.distance <= RADIUS_METERS)
		.sort((a, b) => a.distance - b.distance)
		.map((restaurant) => ({ ...restaurant, distance: Math.round(restaurant.distance) }));

	return { restaurants, adresse, centre, erreur: '' };
}
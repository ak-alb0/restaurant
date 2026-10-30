import Database from 'better-sqlite3';

const db = new Database('tastemap.db');

export default db;

const restaurantsQuery = db.prepare(`
	SELECT id, name, tagline, description, price_tier, rating_avg, rating_count,
	       street_address, postcode, neighborhood, latitude, longitude
	FROM restaurants
	WHERE listing_status = ?
`);

const photosQuery = db.prepare(`
	SELECT p.restaurant_id, p.url, p.caption, p.alt_text
	FROM photos p
	JOIN restaurants r ON r.id = p.restaurant_id
	WHERE r.listing_status = ?
	ORDER BY p.restaurant_id, p.position
`);

const tagsQuery = db.prepare(`
	SELECT rt.restaurant_id, t.name
	FROM restaurant_tags rt
	JOIN tags t ON t.id = rt.tag_id
	JOIN restaurants r ON r.id = rt.restaurant_id
	WHERE r.listing_status = ?
	ORDER BY rt.restaurant_id, rt.position
`);

function groupByRestaurant(rows) {
	const groups = new Map();

	for (const row of rows) {
		if (!groups.has(row.restaurant_id)) {
			groups.set(row.restaurant_id, []);
		}
		groups.get(row.restaurant_id).push(row);
	}

	return groups;
}

export function getPublishedRestaurants() {
	const restaurants = restaurantsQuery.all('published');
	const photos = groupByRestaurant(photosQuery.all('published'));
	const tags = groupByRestaurant(tagsQuery.all('published'));

	return restaurants.map((restaurant) => ({
		...restaurant,
		photos: photos.get(restaurant.id) ?? [],
		tags: tags.get(restaurant.id) ?? []
	}));
}
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export async function geocode(address, fetch) {
	const params = new URLSearchParams({ format: 'json', limit: '1', q: address });

	const response = await fetch(`${NOMINATIM_URL}?${params}`, {
		headers: { 'User-Agent': 'tastemap-projet-ecole' }
	});

	if (!response.ok) {
		throw new Error(`Nominatim a répondu ${response.status}`);
	}

	const results = await response.json();

	if (results.length === 0) {
		return null;
	}

	return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
}
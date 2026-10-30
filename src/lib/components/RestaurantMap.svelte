<script>
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import { RADIUS_METERS } from '#	lib/distance.js';

	let { restaurants, centre, onselect } = $props();

	const DEFAULT_CENTER = [51.5246, -0.0743];

	let container = $state(null);

	onMount(() => {
		let map;
		let cancelled = false;

		async function createMap() {
			const L = (await import('leaflet')).default;

			if (cancelled) return;

			const view = centre ? [centre.lat, centre.lng] : DEFAULT_CENTER;

			map = L.map(container).setView(view, 14);

			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '© OpenStreetMap'
			}).addTo(map);

			if (centre) {
				L.circle(view, {
					radius: RADIUS_METERS,
					color: '#3d6b4a',
					weight: 2,
					fillOpacity: 0.05
				}).addTo(map);
			}

			restaurants.forEach((restaurant, index) => {
				const icon = L.divIcon({
					className: 'pin',
					html: String(index + 1),
					iconSize: [32, 32]
				});

				L.marker([restaurant.latitude, restaurant.longitude], { icon })
					.addTo(map)
					.on('click', () => onselect(restaurant));
			});
		}

		createMap();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});
</script>

<div class="carte" bind:this={container}></div>

<style>
	.carte {
		height: 100%;
		width: 100%;
	}

	:global(.leaflet-tile-pane) {
		filter: sepia(0.35) saturate(0.85) brightness(1.04);
	}

	:global(.pin) {
		background: #3d6b4a;
		color: white;
		border: 3px solid white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 14px;
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
	}
</style>
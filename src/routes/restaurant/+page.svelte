<script>
	import RestaurantMap from '#lib/components/RestaurantMap.svelte';
	import RestaurantList from '#lib/components/RestaurantList.svelte';
	import RestaurantDetails from '#lib/components/RestaurantDetails.svelte';

	let { data } = $props();

	let selected = $state(null);

	const hasSearch = $derived(data.centre !== null);
</script>

<div class="page">
	<div class="panneau">
		{#if selected}
			<RestaurantDetails restaurant={selected} onback={() => (selected = null)} />
		{:else}
			<h1 class="logo">Tastemap.</h1>
			<h2>Your top tables</h2>

			{#if data.erreur}
				<p class="erreur">{data.erreur}</p>
			{/if}

			{#if hasSearch}
				<p class="info">{data.restaurants.length} restaurant(s) dans un rayon de 1 km</p>
			{/if}

			<RestaurantList restaurants={data.restaurants} onselect={(restaurant) => (selected = restaurant)} />
		{/if}
	</div>

	<div class="zone-carte">
		<form class="barre-recherche" method="GET" data-sveltekit-reload>
			<input
				type="text"
				name="adresse"
				value={data.adresse}
				placeholder="Redchurch St, Shoreditch, London"
			/>
			<span class="rayon">1km radius</span>
			<button type="submit">Search</button>
		</form>

		<button class="bouton-owner">Owner of restaurant ?</button>

		<RestaurantMap
			restaurants={data.restaurants}
			centre={data.centre}
			onselect={(restaurant) => (selected = restaurant)}
		/>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Helvetica Neue', Arial, sans-serif;
		color: #1f2a22;
	}

	.page {
		display: flex;
		height: 100vh;
	}

	.panneau {
		width: 360px;
		background: #fafaf6;
		padding: 24px 20px;
		overflow-y: auto;
		box-sizing: border-box;
		border-right: 1px solid #e5e5dc;
	}

	.logo {
		font-family: Georgia, serif;
		font-size: 22px;
		margin: 0 0 18px 0;
	}

	h2 {
		font-family: Georgia, serif;
		font-size: 30px;
		margin: 0 0 14px 0;
	}

	.info {
		display: inline-block;
		background: #eeeee4;
		border-radius: 12px;
		padding: 4px 10px;
		font-size: 12px;
		color: #3d6b4a;
	}

	.erreur {
		background: #fbe9e7;
		color: #b3261e;
		border-radius: 8px;
		padding: 8px 12px;
		font-size: 14px;
	}

	.zone-carte {
		position: relative;
		flex: 1;
	}

	.barre-recherche {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		background: white;
		border-radius: 30px;
		padding: 10px 20px;
		width: 440px;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
		display: flex;
		align-items: center;
		gap: 10px;
		box-sizing: border-box;
	}

	.barre-recherche input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 14px;
	}

	.rayon {
		background: #eee;
		border-radius: 10px;
		padding: 2px 8px;
		font-size: 11px;
		color: #555;
	}

	.barre-recherche button {
		background: none;
		border: none;
		color: #3d6b4a;
		font-weight: bold;
		cursor: pointer;
	}

	.bouton-owner {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 1000;
		background: #3d6b4a;
		color: white;
		border: none;
		border-radius: 20px;
		padding: 10px 18px;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
	}

	.bouton-owner:hover {
		background: #2f5239;
	}
</style>
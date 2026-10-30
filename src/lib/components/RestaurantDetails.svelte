<script>
	let { restaurant, onback } = $props();

	const price = $derived('€'.repeat(restaurant.price_tier));
</script>

<button class="retour" onclick={onback}>← Back to all places</button>

<div class="photos">
	{#each restaurant.photos as photo (photo.url)}
		<img src={photo.url} alt={photo.alt_text} title={photo.caption} />
	{/each}
</div>

<h2>{restaurant.name}</h2>

<div class="infos">
	{#each restaurant.tags as tag (tag.name)}
		<span class="tag">{tag.name}</span>
	{/each}
	<span>{price}</span>
	<span>★ {restaurant.rating_avg} ({restaurant.rating_count} reviews)</span>
</div>

<p>{restaurant.description}</p>

<p class="adresse">
	{restaurant.street_address}, {restaurant.postcode} · {restaurant.neighborhood}
</p>

<style>
	h2 {
		font-family: Georgia, serif;
		font-size: 30px;
		margin: 0 0 14px 0;
	}

	.retour {
		background: none;
		border: none;
		font-size: 14px;
		cursor: pointer;
		padding: 0;
		margin-bottom: 16px;
		color: #1f2a22;
	}

	.retour:hover {
		text-decoration: underline;
	}

	.photos {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
		margin-bottom: 16px;
	}

	.photos img {
		width: 100%;
		height: 100px;
		object-fit: cover;
		background: #e2e2d8;
		border-radius: 8px;
	}

	.photos img:first-child {
		grid-column: span 2;
		height: 170px;
	}

	.infos {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		margin-bottom: 12px;
	}

	.tag {
		background: #e5e5dc;
		border-radius: 10px;
		padding: 3px 9px;
		font-size: 11px;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.adresse {
		font-size: 14px;
		color: #444;
		border-top: 1px solid #e5e5dc;
		padding-top: 12px;
	}
</style>
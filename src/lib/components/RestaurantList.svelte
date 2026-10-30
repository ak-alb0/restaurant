<script>
	let { restaurants, onselect } = $props();
</script>

<ul class="liste">
	{#each restaurants as restaurant, index (restaurant.id)}
		<li>
			<button class="ligne" onclick={() => onselect(restaurant)}>
				<span class="numero">{index + 1}</span>
				<span class="texte">
					<strong>{restaurant.name}</strong>
					<span>{restaurant.tagline} · {restaurant.neighborhood}</span>
					{#if restaurant.distance !== undefined}
						<span>{restaurant.distance} m</span>
					{/if}
				</span>
				<span class="prix">{'€'.repeat(restaurant.price_tier)}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.liste {
		list-style: none;
		padding: 0;
		margin: 12px 0 0 0;
	}

	.ligne {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		padding: 12px 10px;
		margin-bottom: 6px;
		border: none;
		border-radius: 12px;
		background: none;
		text-align: left;
		font-size: 16px;
		cursor: pointer;
	}

	.ligne:hover {
		background: #f3e9d6;
	}

	.numero {
		font-family: Georgia, serif;
		font-size: 22px;
		width: 26px;
		text-align: center;
	}

	.texte {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.texte span {
		font-size: 12px;
		color: #6b6b60;
	}

	.prix {
		font-size: 13px;
		color: #444;
	}
</style>
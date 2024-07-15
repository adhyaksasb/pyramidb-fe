<script lang="ts">
	import Filter from '$lib/components/Characters/Filter.svelte';
	import Card from '$lib/components/Skeleton/Card.svelte';

	let characters: any = $state(null);
	let filteredCharacters: any = $state(null);
	let isLoading: boolean = $state(true);
	let numbers = Array.from(Array(12).keys());

	let rarity: number = $state(0);
	let element: string = $state('');
	let path: string = $state('');

	const filterRarity = (filter: number) => {
		rarity = filter;
		applyFilters();
	};

	const filterElement = (filter: string) => {
		element = filter;
		applyFilters();
	};

	const filterPath = (filter: string) => {
		path = filter;
		applyFilters();
	};

	const applyFilters = () => {
		filteredCharacters = characters.filter((character: any) => {
			return (
				(rarity === 0 || character.Rarity === rarity) &&
				(element === '' || character.Element === element) &&
				(path === '' || character.Path_name === path)
			);
		});
	};

	const fetchCharacters = async () => {
		try {
			const response = await fetch('https://pyramidb-be.vercel.app/api/characters', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const resp = await response.json();
			characters = resp.characters;
			applyFilters();
		} catch (error) {
			console.error('Failed to fetch characters:', error);
		} finally {
			isLoading = false;
		}
	};

	$effect(() => {
		document.title = 'Characters | Honkai: Star Rail DB';
		fetchCharacters();
	});
</script>

<div class="w-full min-w-[375px] p-1.5">
	<h1 class="mb-8 px-10 text-2xl font-bold text-primary">Honkai: Star Rail Characters</h1>
	<div class="rounded-lg border border-border py-6 shadow-lg">
		<Filter {filterRarity} {filterElement} {filterPath} />
		{#if !isLoading}
			{#if filteredCharacters.length != 0}
				<div
					class="grid grid-cols-[repeat(auto-fill,5rem)] items-center justify-between gap-3 rounded-lg px-10 py-4 sm:gap-6"
				>
					{#each filteredCharacters as character}
						<a
							href="/characters/{character.Tag}"
							class="rarity-{character.Rarity} relative h-full w-24 cursor-pointer rounded-lg text-gray-200 hover:scale-105"
						>
							<picture class="h-24 w-24 object-cover">
								<img
									src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{character.Icon}"
									alt={character.Tag}
									class="h-24 w-24 object-cover"
									loading="lazy"
								/>
								<img
									src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/{character.Element}.png"
									alt={character.Element}
									class="absolute left-0 top-0 w-5"
									loading="lazy"
								/>
								<img
									src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{character.Path_icon}"
									alt={character.Path_id}
									class="absolute right-0 top-0 w-5"
									loading="lazy"
								/>
							</picture>
							<div class="flex h-8 items-center justify-center py-1 text-center">
								<p class="break-words text-sm leading-none">{character.Name}</p>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<h1 class="p-10 text-center text-2xl font-bold text-primary">There's no characters</h1>
			{/if}
		{:else}
			<div
				class="grid grid-cols-[repeat(auto-fill,5rem)] items-center justify-between gap-3 px-10 py-4 sm:gap-6"
			>
				{#each numbers as number}
					<Card />
				{/each}
			</div>
		{/if}
	</div>
</div>

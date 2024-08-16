<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { scale } from 'svelte/transition';
	import { cn, areArraysOneToOne } from '$lib/utils';
	import { versionList } from '$lib/achievements';
	import type { Achievement, MergedAchievement } from '$lib/types/achievements';
	import { ChevronDown, Check, Search, SlidersHorizontal, Trophy } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import AchievementCard from '$lib/components/Skeleton/AchievementCard.svelte';
	import HorizontalRule from '$lib/components/Global/HorizontalRule.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	let achievements: Achievement[] = $state([]);
	let achievementSeries: any = $state(null);
	let paginatedAchievements: any = $state([]);
	let filteredAchievements: Achievement[] | MergedAchievement[] = $state([]);
	let completedAchievements: string[] = $state([]);
	let isFilterHovered: boolean = $state(false);
	let isAchievementsHovered: boolean = $state(false);
	let isLoading: boolean = $state(true);
	let perPage: number = $state(25);
	let currPage: number = $state(1);
	let isHidden = $state({ value: '', label: 'All' });
	let selectedSeries = $state({ value: '', label: 'All' });
	let isVersionSelectOpened: boolean = $state(false);
	let searchTerm: string = $state('');
	let selectedOrder = $state({ value: '', label: 'Title (ASC)' });
	let selectedCompletion = $state({ value: '', label: 'All' });

	const handleVersionSelect = () => {
		isVersionSelectOpened = !isVersionSelectOpened;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleVersionSelect();
		}
	};
	let selectedVersions: string[] = $state(versionList);

	let isAllVersionsSelected: boolean = $state(true);

	const deselectAllVersions = () => {
		selectedVersions = [];
		isAllVersionsSelected = areArraysOneToOne<string>(versionList, selectedVersions);
		applyFilters();
	};

	const selectAllVersions = () => {
		selectedVersions = versionList;
		isAllVersionsSelected = areArraysOneToOne<string>(versionList, selectedVersions);
		applyFilters();
	};

	const toggleVersion = (version: string): void => {
		selectedVersions = selectedVersions.includes(version)
			? selectedVersions.filter((item) => item !== version)
			: [...selectedVersions, version];

		isAllVersionsSelected = areArraysOneToOne<string>(versionList, selectedVersions);

		applyFilters();
	};

	let bool: string | boolean = '';

	const filterHovered = () => {
		isFilterHovered = !isFilterHovered;
	};

	const achievementsHovered = () => {
		isAchievementsHovered = !isAchievementsHovered;
	};

	const mergeAchievements = (achievements: Achievement[]): MergedAchievement[] => {
		const merged = new Map<number, MergedAchievement>();

		achievements.forEach((achievement) => {
			const { RelationID } = achievement;

			if (!merged.has(RelationID)) {
				merged.set(RelationID, {
					RelationID,
					Achievements: [achievement] // Store the entire achievement object
				});
			} else {
				merged.get(RelationID)!.Achievements.push(achievement);
			}
		});

		return Array.from(merged.values());
	};

	const fetchAchievements = async () => {
		try {
			const response = await fetch('https://pyramidb-be.vercel.app/api/achievements', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const resp = await response.json();
			achievements = resp.achievements;
			applyFilters();
			handlePageChange(1);
		} catch (error) {
			console.error('Failed to fetch achievements:', error);
		} finally {
			isLoading = false;
		}
	};

	const fetchAchievementSeries = async () => {
		try {
			const response = await fetch('https://pyramidb-be.vercel.app/api/achievement-series', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const resp = await response.json();
			achievementSeries = resp.achievement_series;
		} catch (error) {
			console.error('Failed to fetch achievements:', error);
		}
	};

	const applyFilters = () => {
		if (isHidden.value == 'true' || isHidden.value == 'false') {
			bool = isHidden.value === 'true';
		} else {
			bool = '';
		}

		// Filter achievements based on existing criteria and search term
		filteredAchievements = achievements.filter((achievement: any) => {
			const name = achievement.Title ?? '';
			const description = achievement.Desc ?? '';

			const matchesSeries =
				selectedSeries.value === '' || achievement.Series === selectedSeries.value;
			const matchesHide = bool === '' || achievement.Hide === bool;
			const matchesVersion =
				achievement.version === '' || selectedVersions.includes(achievement.Version);
			const matchesSearch =
				searchTerm === '' ||
				name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				description.toLowerCase().includes(searchTerm.toLowerCase());

			return matchesSeries && matchesHide && matchesVersion && matchesSearch;
		});
		// Sort based on `sortBy` value
		if (selectedOrder.value === 'versionAsc') {
			filteredAchievements.sort((a, b) => a.Version.localeCompare(b.Version));
		} else if (selectedOrder.value === 'versionDesc') {
			filteredAchievements.sort((a, b) => b.Version.localeCompare(a.Version));
		} else if (selectedOrder.value === 'titleDesc') {
			filteredAchievements.sort((a, b) => b.Title.localeCompare(a.Title));
		}

		filteredAchievements = mergeAchievements(filteredAchievements);

		handlePageChange(currPage);
	};

	$effect(() => {
		document.title = 'Achievements | Honkai: Star Rail DB';
		fetchAchievements();
		fetchAchievementSeries();
	});

	const handlePageChange = (page: number): void => {
		paginatedAchievements = filteredAchievements.slice((page - 1) * perPage, page * perPage);
		currPage = page;
	};
</script>

<div class="w-full min-w-[375px] p-1.5">
	<h1 class="mb-8 text-2xl font-bold text-primary md:px-10 lg:px-0">Achievements Tracker</h1>
	<div
		role="banner"
		tabindex="-1"
		aria-label="filter"
		onmouseenter={filterHovered}
		onmouseleave={filterHovered}
		class={cn(
			'flex w-full flex-col rounded-lg border bg-muted px-5',
			isFilterHovered ? 'border-muted-foreground' : 'border-muted-foreground/40'
		)}
	>
		<div class="flex">
			<span
				class={cn(
					'mb-4 flex items-center justify-center gap-2 rounded-b-lg border-x border-b bg-background px-3 py-1',
					isFilterHovered
						? 'border-muted-foreground bg-primary text-gray-300'
						: 'border-muted-foreground/40 bg-background text-muted-foreground'
				)}
			>
				<SlidersHorizontal class="h-[14px] w-[14px]" />
				<p class="text-base font-bold">Filter</p>
			</span>
		</div>
		<div class="mb-4 flex w-fit flex-wrap gap-x-8 gap-y-4 px-5">
			<div class="flex flex-col">
				<p class="text-semibold mb-1 ml-1 text-muted-foreground">Series</p>
				<Select.Root
					bind:selected={selectedSeries}
					onSelectedChange={() => setTimeout(applyFilters, 150)}
				>
					<Select.Trigger class="w-[280px] font-bold hover:bg-foreground/20">
						<Select.Value placeholder="All" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="">All</Select.Item>
						{#each achievementSeries as series}
							<Select.Item value={series.Title}>{series.Title}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col">
				<p class="text-semibold mb-1 ml-1 text-muted-foreground">Completion</p>
				<Select.Root bind:selected={selectedCompletion}>
					<Select.Trigger class="w-[200px] hover:bg-foreground/20">
						<Select.Value placeholder="All" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="">All</Select.Item>
						<Select.Item value="completed">Completed</Select.Item>
						<Select.Item value="incomplete">Incomplete</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col">
				<div
					class="flex flex-col"
					onclick={handleVersionSelect}
					onkeydown={handleKeyDown}
					tabindex="0"
					role="button"
				>
					<p class="text-semibold mb-1 ml-1 text-muted-foreground">Version</p>
					<button
						class="inline-flex w-[200px] items-center justify-between rounded-sm border border-muted-foreground/20 bg-background px-4 py-[0.45rem] text-center text-sm text-foreground hover:bg-foreground/20"
						type="button"
						data-dropdown-toggle="dropdown">All <ChevronDown /></button
					>
				</div>
				<!-- Dropdown menu -->
				{#if isVersionSelectOpened}
					<div
						class={cn(
							'relative z-50 list-none divide-y divide-gray-100 rounded bg-background text-base shadow-lg'
						)}
						in:scale={{ duration: 100 }}
					>
						<div
							class="absolute my-1 flex w-[200px] flex-col rounded-md border border-muted-foreground/30 bg-background text-center"
						>
							{#if isAllVersionsSelected}
								<button
									type="button"
									class="block rounded-sm py-2 text-sm hover:bg-accent"
									onclick={deselectAllVersions}>Deselect All</button
								>
							{:else}
								<button
									type="button"
									class="block rounded-sm py-2 text-sm hover:bg-accent"
									onclick={selectAllVersions}>Select All</button
								>
							{/if}

							<div class="grid grid-cols-2">
								{#each versionList as version}
									<button
										type="button"
										class={cn(
											'grid w-full grid-cols-6 items-center gap-2 px-4 py-2 text-sm hover:bg-accent',
											selectedVersions.includes(version)
												? 'bg-accent/60'
												: 'bg-background text-muted-foreground'
										)}
										onclick={() => toggleVersion(version)}
									>
										{#if selectedVersions.includes(version)}
											<Check class="col-span-2 h-5 w-5" />
										{:else}
											<div class="col-span-2"></div>
										{/if}
										<p class="col-span-4">{version}</p></button
									>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-col">
				<p class="text-semibold mb-1 ml-1 text-muted-foreground">Hidden</p>
				<Select.Root
					bind:selected={isHidden}
					onSelectedChange={() => setTimeout(applyFilters, 150)}
				>
					<Select.Trigger class="w-[200px] hover:bg-foreground/20">
						<Select.Value placeholder="All" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="">All</Select.Item>
						<Select.Item value="true">Hidden</Select.Item>
						<Select.Item value="false">Not Hidden</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col">
				<p class="text-semibold mb-1 ml-1 text-muted-foreground">Order</p>
				<Select.Root
					bind:selected={selectedOrder}
					onSelectedChange={() => setTimeout(applyFilters, 150)}
				>
					<Select.Trigger class="w-[200px] hover:bg-foreground/20">
						<Select.Value placeholder="Default" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="">Title (ASC)</Select.Item>
						<Select.Item value="titleDesc">Title (DESC)</Select.Item>
						<Select.Item value="versionAsc">Version (ASC)</Select.Item>
						<Select.Item value="versionDesc">Version (DESC)</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div class="mb-6 flex flex-col px-5 text-muted-foreground">
			<p>Collected <span class="font-semibold">4585 / 5310</span> Jades</p>
			<p>Completed <span class="font-semibold">753 / 880</span> Achievements</p>
		</div>
	</div>
	<HorizontalRule />
	{#if !isLoading && filteredAchievements != null}
		<Pagination.Root
			count={filteredAchievements.length}
			{perPage}
			let:pages
			let:currentPage
			let:range
			class="mb-6"
		>
			<Pagination.Content>
				<div class="flex flex-col gap-2">
					<div class="flex">
						<Pagination.Item>
							<Pagination.PrevButton on:click={() => handlePageChange(currPage - 1)} />
						</Pagination.Item>
						{#each pages as page (page.key)}
							{#if page.type === 'ellipsis'}
								<Pagination.Item>
									<Pagination.Ellipsis />
								</Pagination.Item>
							{:else}
								<Pagination.Item>
									<Pagination.Link
										{page}
										isActive={currentPage == page.value}
										on:click={() => handlePageChange(page.value)}
									>
										{page.value}
									</Pagination.Link>
								</Pagination.Item>
							{/if}
						{/each}
						<Pagination.Item>
							<Pagination.NextButton on:click={() => handlePageChange(currPage + 1)} />
						</Pagination.Item>
					</div>
					<p class="text-center text-[13px] text-muted-foreground">
						Showing {range.start + 1} - {range.end} of {filteredAchievements.length} achievements
					</p>
				</div>
			</Pagination.Content>
		</Pagination.Root>
	{/if}
	<div class="relative mb-6 ml-auto flex-1 text-xl text-text-primary">
		<Search class="absolute left-3.5 top-2.5 mr-8 h-5 w-5 text-text-primary" />
		<Input
			type="search"
			placeholder="Search Achievements..."
			class="w-full rounded-lg bg-background pl-11 text-lg"
			bind:value={searchTerm}
			oninput={applyFilters}
		/>
	</div>
	<div
		role="banner"
		tabindex="-1"
		aria-label="filter"
		onmouseenter={achievementsHovered}
		onmouseleave={achievementsHovered}
		class={cn(
			'mb-6 flex w-full flex-col rounded-lg border bg-muted px-5',
			isAchievementsHovered ? 'border-muted-foreground' : 'border-muted-foreground/40'
		)}
	>
		<div class="flex">
			<span
				class={cn(
					'mb-4 flex items-center justify-center gap-2 rounded-b-lg border-x border-b bg-background px-3 py-1',
					isAchievementsHovered
						? 'border-muted-foreground bg-primary text-gray-300'
						: 'border-muted-foreground/40 bg-background text-muted-foreground'
				)}
			>
				<Trophy class="h-[14px] w-[14px]" />
				<p class="text-base font-bold">Achievements</p>
			</span>
		</div>
		<div class="mb-4 flex w-full flex-col gap-2">
			{#if isLoading}
				<AchievementCard />
			{:else if paginatedAchievements != null && paginatedAchievements.length > 0}
				{#each paginatedAchievements as achievement}
					{#if achievement.Achievements.length > 1}
						<div class="flex flex-col gap-2 rounded-lg border border-primary px-2 pb-2">
							<span class="ml-4 w-fit rounded-b-md bg-primary px-3 py-1 text-sm text-white"
								>Related</span
							>
							{#each achievement.Achievements as item}
								<div
									class="flex flex-col gap-1 rounded-lg border border-muted-foreground/40 p-4 hover:translate-y-0.5 hover:border-muted-foreground/70"
								>
									<div class="flex w-full justify-between pl-1">
										<p class="text-lg font-bold">{item.Title}</p>
										<input type="checkbox" class="h-6 w-6 cursor-pointer" />
									</div>
									<span class="mb-2 text-muted-foreground">{item.Desc}</span>
									<div class="flex gap-2 text-muted-foreground">
										{#if item.Hide}
											<div
												class="flex h-6 items-center rounded-full border border-border px-2 md:h-7 md:px-2.5"
											>
												Hidden
											</div>
										{/if}
										<div
											class="flex h-6 items-center gap-1 rounded-full border border-border px-2 md:h-7 md:px-2.5"
										>
											<img
												src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/item/900001.png"
												alt="stellar_jade_icon"
												class="size-5"
											/>
											<p class="font-semibold">{item.Reward}</p>
										</div>
										<div
											class="flex h-6 items-center rounded-full border border-border px-2 md:h-7 md:px-2.5"
										>
											<p class="font-semibold">{item.Version}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div
							class="flex flex-col gap-1 rounded-lg border border-muted-foreground/40 p-4 hover:translate-y-0.5 hover:border-muted-foreground/70"
						>
							<div class="flex w-full justify-between pl-1">
								<p class="text-lg font-bold">{achievement.Achievements[0].Title}</p>
								<input type="checkbox" class="h-6 w-6 cursor-pointer" />
							</div>
							<span class="mb-2 text-muted-foreground">{achievement.Achievements[0].Desc}</span>
							<div class="flex gap-2 text-muted-foreground">
								{#if achievement.Achievements[0].Hide}
									<div
										class="flex h-6 items-center rounded-full border border-border px-2 md:h-7 md:px-2.5"
									>
										Hidden
									</div>
								{/if}
								<div
									class="flex h-6 items-center gap-1 rounded-full border border-border px-2 md:h-7 md:px-2.5"
								>
									<img
										src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/item/900001.png"
										alt="stellar_jade_icon"
										class="size-5"
									/>
									<p class="font-semibold">{achievement.Achievements[0].Reward}</p>
								</div>
								<div
									class="flex h-6 items-center rounded-full border border-border px-2 md:h-7 md:px-2.5"
								>
									<p class="font-semibold">{achievement.Achievements[0].Version}</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			{:else}
				<div class="my-2 flex flex-col items-center justify-center gap-2">
					<Trophy class="h-40 w-40" />
					<p class="text-3xl">No achievement was found</p>
				</div>
			{/if}
		</div>
	</div>
	{#if !isLoading && filteredAchievements != null}
		<Pagination.Root
			count={filteredAchievements.length}
			{perPage}
			let:pages
			let:currentPage
			let:range
			class="mb-6"
		>
			<Pagination.Content>
				<div class="flex flex-col gap-2">
					<div class="flex">
						<Pagination.Item>
							<Pagination.PrevButton on:click={() => handlePageChange(currPage - 1)} />
						</Pagination.Item>
						{#each pages as page (page.key)}
							{#if page.type === 'ellipsis'}
								<Pagination.Item>
									<Pagination.Ellipsis />
								</Pagination.Item>
							{:else}
								<Pagination.Item>
									<Pagination.Link
										{page}
										isActive={currentPage == page.value}
										on:click={() => handlePageChange(page.value)}
									>
										{page.value}
									</Pagination.Link>
								</Pagination.Item>
							{/if}
						{/each}
						<Pagination.Item>
							<Pagination.NextButton on:click={() => handlePageChange(currPage + 1)} />
						</Pagination.Item>
					</div>
					<p class="text-center text-[13px] text-muted-foreground">
						Showing {range.start + 1} - {range.end} of {filteredAchievements.length} achievements
					</p>
				</div>
			</Pagination.Content>
		</Pagination.Root>
	{/if}
</div>

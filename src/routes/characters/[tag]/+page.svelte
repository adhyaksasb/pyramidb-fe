<script lang="ts">
	import StatRange from '$lib/components/CharacterDetails/StatRange.svelte';
	import { cn } from '$lib/utils';

	let data: any = $props();

	let character = data.data.props[0];

	let skills: any = $state(null);

	let tab: string = $state('Basic');

	let basic: any = $state(null);
	let skill: any = $state(null);
	let ultimate: any = $state(null);
	let talent: any = $state(null);
	let technique: any = $state(null);

	let basicLevel: number = $state(1);
	let skillLevel: number = $state(1);
	let ultimateLevel: number = $state(1);
	let talentLevel: number = $state(1);

	const skillClick = (type: string) => {
		tab = type;
	};

	const changeBasicLevel = (event: Event) => {
		const target = event.target as HTMLInputElement;
		basicLevel = Number(target.value);
	};

	const changeSkillLevel = (event: Event) => {
		const target = event.target as HTMLInputElement;
		skillLevel = Number(target.value);
	};

	const changeUltimateLevel = (event: Event) => {
		const target = event.target as HTMLInputElement;
		ultimateLevel = Number(target.value);
	};

	const changeTalentLevel = (event: Event) => {
		const target = event.target as HTMLInputElement;
		talentLevel = Number(target.value);
	};

	const fetchCharacterSkills = async () => {
		try {
			const response = await fetch(
				`https://pyramidb-be.vercel.app/api/character-skills/${character.ID}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const resp = await response.json();
			skills = resp.skills;
			basic = resp.skills.filter((skill: any) => skill.type === 'Basic ATK');
			skill = resp.skills.filter((skill: any) => skill.type === 'Skill');
			ultimate = resp.skills.filter((skill: any) => skill.type === 'Ultimate');
			talent = resp.skills.filter((skill: any) => skill.type === 'Talent');
			technique = resp.skills.filter((skill: any) => skill.type === 'Technique');
		} catch (error) {
			console.error('Failed to fetch character skills:', error);
		}
	};

	$effect(() => {
		fetchCharacterSkills();
	});
</script>

<div class="rounded-xl border-2 bg-background shadow-md dark:border-none md:min-w-[872px]">
	<div class="gap-4 px-6 py-2 lg:grid lg:grid-cols-12">
		<div class="col-span-4 flex items-center justify-center">
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{character.Portrait}"
				alt={character.Portrait}
				class="h-fit w-fit p-2"
				loading="lazy"
			/>
		</div>
		<div class="col-span-8">
			<div class="px-9 py-8">
				<div class="flex justify-between">
					<span class="pt-4 text-4xl font-semibold text-primary">{character.Name}</span>
					<div class="flex gap-2">
						<div class="flex shrink flex-col items-center justify-center">
							<img
								src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/deco/rarity_{character.Rarity}.png"
								alt={character.Element}
								class="h-12 w-12"
							/>
							<p>{character.Rarity} Star</p>
						</div>
						<div class="flex shrink flex-col items-center justify-center">
							<img
								src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/{character.Element}.png"
								alt={character.Element}
								class="h-12 w-12"
							/>
							<p>{character.Element}</p>
						</div>
					</div>
				</div>
				<div
					class="flex w-fit items-center gap-2 rounded-md bg-gray-100 px-4 py-2 dark:bg-gray-900"
				>
					<img
						src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{character.Path
							.Path_icon}"
						alt={character.Path.Path_name}
						class="h-8 w-8"
					/>
					<span class="text-xl">{character.Path.Path_name}</span>
				</div>
				<div class="flex flex-col gap-2 py-4 pr-1 lg:mt-8 lg:gap-4">
					<StatRange
						name="HP"
						max={1475}
						min={847}
						stats={character.Status.HP}
						icon="IconMaxHP.png"
					/>
					<StatRange
						name="ATK"
						max={776}
						min={466}
						stats={character.Status.ATK}
						icon="IconAttack.png"
					/>
					<StatRange
						name="DEF"
						max={655}
						min={331}
						stats={character.Status.DEF}
						icon="IconDefence.png"
					/>
					<StatRange
						name="SPD"
						max={115}
						min={90}
						stats={character.Status.SPD}
						icon="IconSpeed.png"
					/>
					<StatRange
						name="Energy"
						max={180}
						min={110}
						stats={character.Max_sp}
						icon="IconEnergyLimit.png"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="container mt-8 px-14 py-2">
		<h1 class="border-b-4 border-primary pb-2 text-2xl font-bold">Skills Overview</h1>
		<div class="mt-6 flex gap-3">
			<button
				onclick={() => skillClick('Basic')}
				class={cn(
					'rounded-md border-2 p-1',
					tab === 'Basic' ? 'border-primary opacity-100' : 'border-border opacity-60'
				)}
			>
				{#if skills && skills.length > 0}
					<img
						src={`https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/${skills[0].icon}`}
						alt="Skill Icon"
						class="h-10 w-10 md:h-12 md:w-12"
					/>
				{:else}
					<svg class="h-10 w-10 animate-pulse bg-slate-700 md:h-12 md:w-12" viewBox="0 0 24 24">
						<!-- ... -->
					</svg>
				{/if}
			</button>
			<button
				onclick={() => skillClick('Skill')}
				class={cn(
					'rounded-md border-2 p-1',
					tab === 'Skill' ? 'border-primary opacity-100' : 'border-border opacity-60'
				)}
			>
				{#if skills && skills.length > 0}
					<img
						src={`https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/${skills[1].icon}`}
						alt="Skill Icon"
						class="h-10 w-10 md:h-12 md:w-12"
					/>
				{:else}
					<svg class="h-10 w-10 animate-pulse bg-slate-700 md:h-12 md:w-12" viewBox="0 0 24 24">
						<!-- ... -->
					</svg>
				{/if}
			</button>
			<button
				onclick={() => skillClick('Ultimate')}
				class={cn(
					'rounded-md border-2 p-1',
					tab === 'Ultimate' ? 'border-primary opacity-100' : 'border-border opacity-60'
				)}
			>
				{#if skills && skills.length > 0}
					<img
						src={`https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/${skills[2].icon}`}
						alt="Skill Icon"
						class="h-10 w-10 md:h-12 md:w-12"
					/>
				{:else}
					<svg class="h-10 w-10 animate-pulse bg-slate-700 md:h-12 md:w-12" viewBox="0 0 24 24">
						<!-- ... -->
					</svg>
				{/if}
			</button>
			<button
				onclick={() => skillClick('Talent')}
				class={cn(
					'rounded-md border-2 p-1',
					tab === 'Talent' ? 'border-primary opacity-100' : 'border-border opacity-60'
				)}
			>
				{#if skills && skills.length > 0}
					<img
						src={`https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/${skills[3].icon}`}
						alt="Skill Icon"
						class="h-10 w-10 md:h-12 md:w-12"
					/>
				{:else}
					<svg class="h-10 w-10 animate-pulse bg-slate-700 md:h-12 md:w-12" viewBox="0 0 24 24">
						<!-- ... -->
					</svg>
				{/if}
			</button>
			<button
				onclick={() => skillClick('Technique')}
				class={cn(
					'rounded-md border-2 p-1',
					tab === 'Technique' ? 'border-primary opacity-100' : 'border-border opacity-60'
				)}
			>
				{#if skills && skills.length > 0}
					<img
						src={`https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/${skills[4].icon}`}
						alt="Skill Icon"
						class="h-10 w-10 md:h-12 md:w-12"
					/>
				{:else}
					<svg class="h-10 w-10 animate-pulse bg-slate-700 md:h-12 md:w-12" viewBox="0 0 24 24">
						<!-- ... -->
					</svg>
				{/if}
			</button>
		</div>
		{#if skills && skills.length > 0}
			<div class="mt-10">
				{#if tab === 'Basic'}
					<div class="mb-8 flex flex-col gap-6 md:flex-row">
						<img
							src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{skills[0].icon}"
							alt="gdfgfdgdfgdf"
							class="h-24 w-24"
						/>
						<div class="flex w-full flex-col gap-2">
							<div class="flex items-center gap-2">
								<p class="text-md">{skills[0].name}</p>
								<span
									class="rounded-xl bg-gray-200 px-2.5 py-1.5 text-sm text-primary dark:bg-gray-900"
									>{skills[0].type}</span
								>
							</div>
							<div class="flex">
								<p class="text-md min-w-[75px]">
									Level <span class="text-md font-bold text-primary">{basicLevel}</span>
								</p>
								<input class="ml-2 w-16 bg-transparent text-primary" type="input" disabled />
								<input
									type="range"
									min="1"
									max={skills[0].max_level}
									step="1"
									bind:value={basicLevel}
									class="rangeSlider h-6 w-80 bg-red-400"
									oninput={() => changeBasicLevel}
								/>
							</div>
							{#each basic as action}
								<div class="mb-4 flex flex-col gap-2">
									<span class="w-fit rounded-xl bg-gray-100 p-1.5 text-sm dark:bg-gray-900"
										>{action.effect}</span
									>
									<p class="text-md">
										{action.level[basicLevel - 1]}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{:else if tab === 'Skill'}
					<div class="mb-8 flex flex-col gap-6 md:flex-row">
						<img
							src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{skills[1].icon}"
							alt="gdfgfdgdfgdf"
							class="h-24 w-24"
						/>
						<div class="flex w-full flex-col gap-2">
							<div class="flex items-center gap-2">
								<p class="text-md">{skills[1].name}</p>
								<span
									class="rounded-xl bg-gray-200 px-2.5 py-1.5 text-sm text-primary dark:bg-gray-900"
									>{skills[1].type}</span
								>
							</div>
							<div class="flex">
								<p class="text-md min-w-[75px]">
									Level <span class="text-md font-bold text-primary">{skillLevel}</span>
								</p>
								<input class="ml-2 w-16 bg-transparent text-primary" type="input" disabled />
								<input
									type="range"
									min="1"
									max={skills[1].max_level}
									step="1"
									bind:value={skillLevel}
									class="rangeSlider h-6 w-80 bg-red-400"
									oninput={() => changeSkillLevel}
								/>
							</div>
							{#each skill as action}
								<div class="mb-4 flex flex-col gap-2">
									<span class="w-fit rounded-xl bg-gray-100 p-1.5 text-sm dark:bg-gray-900"
										>{action.effect}</span
									>
									<p class="text-md">
										{action.level[skillLevel - 1]}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{:else if tab === 'Ultimate'}
					<div class="mb-8 flex flex-col gap-6 md:flex-row">
						<img
							src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{skills[2].icon}"
							alt="gdfgfdgdfgdf"
							class="h-24 w-24"
						/>
						<div class="flex w-full flex-col gap-2">
							<div class="flex items-center gap-2">
								<p class="text-md">{skills[2].name}</p>
								<span
									class="rounded-xl bg-gray-200 px-2.5 py-1.5 text-sm text-primary dark:bg-gray-900"
									>{skills[2].type}</span
								>
							</div>
							<div class="flex">
								<p class="text-md min-w-[75px]">
									Level <span class="text-md font-bold text-primary">{ultimateLevel}</span>
								</p>
								<input class="ml-2 w-16 bg-transparent text-primary" type="input" disabled />
								<input
									type="range"
									min="1"
									max={skills[2].max_level}
									step="1"
									bind:value={ultimateLevel}
									class="rangeSlider h-6 w-80 bg-red-400"
									oninput={() => changeUltimateLevel}
								/>
							</div>
							{#each ultimate as action}
								<div class="mb-4">
									<span class="w-fit rounded-xl bg-gray-100 p-1.5 text-sm dark:bg-gray-900"
										>{action.effect}</span
									>
									<p class="text-md">
										{action.level[ultimateLevel - 1]}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{:else if tab === 'Talent'}
					{#each talent as action}
						<div class="mb-8 flex flex-col gap-6 md:flex-row">
							<img
								src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{action.icon}"
								alt="gdfgfdgdfgdf"
								class="h-24 w-24"
							/>
							<div class="flex w-full flex-col gap-2">
								<div class="flex items-center gap-2">
									<p class="text-md">{skills[3].name}</p>
									<span
										class="rounded-xl bg-gray-200 px-2.5 py-1.5 text-sm text-primary dark:bg-gray-900"
										>{skills[3].type}</span
									>
								</div>
								<div class="flex">
									<p class="text-md min-w-[75px]">
										Level <span class="text-md font-bold text-primary">{talentLevel}</span>
									</p>
									<input class="ml-2 w-16 bg-transparent text-primary" type="input" disabled />
									<input
										type="range"
										min="1"
										max={action.max_level}
										step="1"
										bind:value={talentLevel}
										class="rangeSlider h-6 w-80 bg-red-400"
										oninput={() => changeTalentLevel}
									/>
								</div>
								<span class="w-fit rounded-xl bg-gray-100 p-1.5 text-sm dark:bg-gray-900"
									>{action.effect}</span
								>
								<p class="text-md">
									{action.level[talentLevel - 1]}
								</p>
							</div>
						</div>
					{/each}
				{:else if tab === 'Technique'}
					{#each technique as action}
						<div class="mb-8 flex flex-col gap-6 md:flex-row">
							<img
								src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/{action.icon}"
								alt="gdfgfdgdfgdf"
								class="h-24 w-24"
							/>
							<div class="flex w-full flex-col gap-2">
								<div class="flex items-center gap-2">
									<p class="text-md">{action.name}</p>
									<span
										class="rounded-xl bg-gray-200 px-2.5 py-1.5 text-sm text-primary dark:bg-gray-900"
										>{action.type}</span
									>
								</div>
								<div class="flex">
									<p class="text-md">Level {action.max_level}</p>
								</div>
								<span class="w-fit rounded-xl bg-gray-100 p-1.5 text-sm dark:bg-gray-900"
									>{action.effect}</span
								>
								<p class="text-md">
									{action.description}
								</p>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>

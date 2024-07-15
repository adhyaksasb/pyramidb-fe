<script lang="ts">
	import { cn } from '$lib/utils';

	let rarity: number = $state(0);
	let element: string = $state('');
	let path: string = $state('');
	let dummy: number = $state(0);

	let { filterRarity, filterElement, filterPath }: any = $props();

	const setRarity = (val: number) => {
		if (rarity != val) {
			rarity = val;
			filterRarity(val);
		} else {
			rarity = 0;
			filterRarity(0);
		}
	};

	const setElement = (val: string) => {
		if (element != val) {
			element = val;
			filterElement(val);
		} else {
			element = '';
			filterElement('');
		}
	};

	const setPath = (val: string) => {
		if (path != val) {
			path = val;
			filterPath(val);
		} else {
			path = '';
			filterPath('');
		}
	};
</script>

<div
	class="flex flex-col flex-wrap items-center justify-center gap-4 rounded-lg bg-background px-8 py-2 md:flex-row"
>
	<!-- Rarity  -->
	<div id="rarity" class="flex rounded-lg border border-border bg-gray-100 dark:bg-gray-900">
		<button
			onclick={() => setRarity(4)}
			class={cn('rounded-l-lg p-2 hover:bg-accent', rarity === 4 ? 'bg-accent' : '')}
			title="4 Star"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/deco/rarity_4.png"
				alt="rarity_4"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setRarity(5)}
			class={cn('rounded-r-lg p-2 hover:bg-accent', rarity === 5 ? 'bg-accent' : '')}
			title="5 Star"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/deco/rarity_5.png"
				alt="rarity_5"
				class="h-7 w-7"
			/>
		</button>
	</div>
	<!-- Element -->
	<div id="element" class="flex rounded-lg border border-border bg-gray-100 dark:bg-gray-900">
		<button
			onclick={() => setElement('Fire')}
			class={cn('rounded-l-lg p-2 hover:bg-accent', element === 'Fire' ? 'bg-accent' : '')}
			title="Fire"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Fire.png"
				alt="Fire"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Ice')}
			class={cn('p-2 hover:bg-accent', element === 'Ice' ? 'bg-accent' : '')}
			title="Ice"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Ice.png"
				alt="Ice"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Imaginary')}
			class={cn('p-2 hover:bg-accent', element === 'Imaginary' ? 'bg-accent' : '')}
			title="Imaginary"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Imaginary.png"
				alt="Imaginary"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Lightning')}
			class={cn('p-2 hover:bg-accent', element === 'Lightning' ? 'bg-accent' : '')}
			title="Lightning"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Lightning.png"
				alt="Lightning"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Physical')}
			class={cn('p-2 hover:bg-accent', element === 'Physical' ? 'bg-accent' : '')}
			title="Physical"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Physical.png"
				alt="Physical"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Quantum')}
			class={cn('p-2 hover:bg-accent', element === 'Quantum' ? 'bg-accent' : '')}
			title="Quantum"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Quantum.png"
				alt="Quantum"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setElement('Wind')}
			class={cn('rounded-r-lg p-2 hover:bg-accent', element === 'Wind' ? 'bg-accent' : '')}
			title="Wind"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/element/Wind.png"
				alt="Wind"
				class="h-7 w-7"
			/>
		</button>
	</div>
	<!-- Path -->
	<div id="path" class="flex rounded-lg border border-border bg-gray-100 dark:bg-gray-900">
		<button
			onclick={() => setPath('Abundance')}
			class={cn('rounded-l-lg p-2 hover:bg-accent', path === 'Abundance' ? 'bg-accent' : '')}
			title="Abundance"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Abundance.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('Destruction')}
			class={cn('p-2 hover:bg-accent', path === 'Destruction' ? 'bg-accent' : '')}
			title="Destruction"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Destruction.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('Erudition')}
			class={cn('p-2 hover:bg-accent', path === 'Erudition' ? 'bg-accent' : '')}
			title="Erudition"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Erudition.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('Harmony')}
			class={cn('p-2 hover:bg-accent', path === 'Harmony' ? 'bg-accent' : '')}
			title="Harmony"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Harmony.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('The Hunt')}
			class={cn('p-2 hover:bg-accent', path === 'The Hunt' ? 'bg-accent' : '')}
			title="The Hunt"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Hunt.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('Nihility')}
			class={cn('p-2 hover:bg-accent', path === 'Nihility' ? 'bg-accent' : '')}
			title="Nihility"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Nihility.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
		<button
			onclick={() => setPath('Preservation')}
			class={cn('rounded-r-lg p-2 hover:bg-accent', path === 'Preservation' ? 'bg-accent' : '')}
			title="Preservation"
		>
			<img
				src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/path/Preservation.png"
				alt="path"
				class="h-7 w-7"
			/>
		</button>
	</div>
</div>

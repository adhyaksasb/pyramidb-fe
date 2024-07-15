<script lang="ts">
	import { getRangeStats } from '$lib/utils';

	let {
		name,
		max,
		min,
		stats,
		icon
	}: { name: string; max: number; min: number; stats: number; icon: string } = $props();
</script>

<div id={name} class="grid grid-cols-12 items-center justify-between">
	<div class="col-span-4 flex items-center gap-2 md:col-span-3">
		<img
			src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/property/{icon}"
			alt="Max HP"
			class="h-8 w-8"
		/>
		<span class="text-lg">{name}</span>
	</div>
	<div
		class="dark:bg-dark-700 col-span-6 h-2.5 w-full rounded-full bg-gray-200 md:col-span-7 md:w-full"
	>
		<div
			class="h-2.5 rounded-full bg-primary"
			style="width: {getRangeStats(max, min, stats)}%"
		></div>
	</div>
	<div class="col-span-2 flex justify-end">
		<span class="text-lg">{stats}</span>
	</div>
</div>

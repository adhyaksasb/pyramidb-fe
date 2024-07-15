<script lang="ts">
	import { cn } from '$lib/utils';

	export let icon: string;
	export let path: string;
	export let href: string;
	export let name: string;
	export let filter: boolean;
</script>

<a
	{href}
	class={cn(
		'flex items-center gap-4 px-2.5',
		path === href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
	)}
>
	<img
		src="https://pyramidb.s3.ap-southeast-3.amazonaws.com/img/starRail/icon/sign/{icon}"
		alt={name}
		class={cn('h-6 w-6 fill-current', filter ? 'whiteFilter' : '')}
	/>
	{name}
</a>

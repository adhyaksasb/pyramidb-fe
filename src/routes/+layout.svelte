<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<link rel="icon" href="/logo-mini.svg" />
</svelte:head>

<ModeWatcher></ModeWatcher>
{@render children()}

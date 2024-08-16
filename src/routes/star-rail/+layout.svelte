<script lang="ts">
	import Sidebar from '$lib/components/Navbar/Sidebar.svelte';
	import Header from '$lib/components/Navbar/Header.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
	let path = $derived($page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href="/logo-mini.svg" />
</svelte:head>

<ModeWatcher></ModeWatcher>
<div class="flex min-h-screen w-full flex-col bg-background">
	<Sidebar {path}></Sidebar>
	<div class="flex flex-col md:gap-4 md:py-4 md:pl-14">
		<Header {path}></Header>
		<main class="min-w-[375px] py-4 lg:px-40 xl:px-64">
			{@render children()}
		</main>
	</div>
</div>

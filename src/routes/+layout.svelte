<script>
	import '../app.css';
	import Sidebar from '$lib/components/Navbar/Sidebar.svelte';
	import Header from '$lib/components/Navbar/Header.svelte';
	import LandingSidebar from '$lib/components/Landing/LandingSidebar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
	let path = $derived($page.url.pathname);
</script>

<ModeWatcher></ModeWatcher>
<div class="flex min-h-screen w-full flex-col bg-background">
	<Sidebar {path}></Sidebar>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<Header {path}></Header>
		<main class="min-w-[375px] py-4 lg:px-64">
			{@render children()}
		</main>
	</div>
</div>

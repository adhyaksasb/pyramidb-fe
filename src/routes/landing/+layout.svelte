<script>
	import '../../app.css';
	import Sidebar from '$lib/components/Navbar/Sidebar.svelte';
	import Header from '$lib/components/Navbar/Header.svelte';
	import LandingSidebar from '$lib/components/Landing/LandingSidebar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
	let path = $derived($page.url.pathname);
</script>

{@render children()}

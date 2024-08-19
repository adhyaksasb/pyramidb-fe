<script lang="ts">
	import Sidebar from '$lib/components/Navbar/Sidebar.svelte';
	import Header from '$lib/components/Navbar/Header.svelte';
	import { setWithExpiry, getWithExpiry } from '$lib/utils';
	import { page } from '$app/stores';

	let { children } = $props();

	let path = $derived($page.url.pathname);

	const fetchUserInfo = async (token: string | null) => {
		try {
			const response = await fetch('https://pyramidb-be.vercel.app/api/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response.ok) {
				const data = await response.json();

				setWithExpiry('user', data.user, 10080000);
			} else {
				getWithExpiry('user');
			}
		} catch (error) {
			console.error('Failed to fetch characters:', error);
		}
	};

	$effect(() => {
		let token: string | null = getWithExpiry('token');

		fetchUserInfo(token);
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo-mini.svg" />
</svelte:head>

<div class="flex min-h-screen w-full flex-col bg-background">
	<Sidebar {path}></Sidebar>
	<div class="flex flex-col md:gap-4 md:py-4 md:pl-14">
		<Header {path}></Header>
		<main class="min-w-[375px] py-4 lg:px-40 xl:px-64">
			{@render children()}
		</main>
	</div>
</div>

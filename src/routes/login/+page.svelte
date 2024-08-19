<script lang="ts">
	import { setWithExpiry, getWithExpiry } from '$lib/utils';
	import { fetchUserInfo } from '$lib/users';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';
	import Spinner from '$lib/components/Global/Spinner.svelte';

	type LoginData = {
		username: string;
		email: string;
		password: string;
	};

	let formData: LoginData = {
		username: '',
		email: '',
		password: ''
	};

	let isLoading: boolean = false;

	const login = async (event: Event) => {
		event.preventDefault();

		try {
			isLoading = true;

			const response = await fetch('https://pyramidb-be.vercel.app/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			const data = await response.json();
			const token = data.token;

			// Store the token (e.g., in localStorage or sessionStorage)
			setWithExpiry('token', token, 10080000);

			// Fetch user info and redirect
			await fetchUserInfo(token);
			goto('/star-rail');
		} catch (error) {
			console.error('Failed to log in:', error);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="grid min-h-screen w-full lg:grid-cols-2">
	<div class="flex items-center justify-center py-12">
		<div class="m-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div class="grid gap-4">
				<form onsubmit={login} class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Username/Email</Label>
						<Input
							id="email"
							type="text"
							bind:value={formData.email}
							placeholder="Username/Email"
							required
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<Input
							id="password"
							type="password"
							bind:value={formData.password}
							placeholder="Password"
							required
						/>
					</div>
					<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
					{#if isLoading}
						<button
							type="button"
							class="flex items-center justify-center rounded-md bg-primary/60 px-4 py-2"
							disabled
						>
							<Spinner />
						</button>
					{:else}
						<Button type="submit" class="mt-4 w-full">Sign Up</Button>
					{/if}
				</form>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t"></span>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/register" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<div class="flex h-screen w-full items-center justify-center text-primary">
			<span class="text-4xl sm:text-8xl">PyramidDB</span>
		</div>
	</div>
</div>

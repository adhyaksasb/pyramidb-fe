<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Spinner from '$lib/components/Global/Spinner.svelte';
	import { cn, isValidPassword } from '$lib/utils';

	type RegisterData = {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	};

	type ValidationCheck = {
		password: boolean;
		confirmPassword: boolean;
	};

	let formData: RegisterData = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	let validateForm: ValidationCheck = $state({
		password: false,
		confirmPassword: false
	});

	let isLoading: boolean = $state(false);

	const signUp = async (event: Event) => {
		event.preventDefault();

		if (!isValidPassword(formData.password)) {
			validateForm.password = true;

			setTimeout(() => {
				validateForm.password = false;
			}, 2000);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			validateForm.confirmPassword = true;

			setTimeout(() => {
				validateForm.confirmPassword = false;
			}, 2000);
			return;
		}

		try {
			isLoading = true;

			const response = await fetch('https://pyramidb-be.vercel.app/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			const resp = await response.json();
		} catch (error) {
			console.error('Failed to sign up:', error);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="grid min-h-screen w-full lg:grid-cols-2">
	<div class="hidden bg-muted lg:block">
		<div class="flex h-screen w-full items-center justify-center text-primary">
			<span class="text-4xl sm:text-8xl">PyramidDB</span>
		</div>
	</div>
	<div class="flex items-center justify-center py-12">
		<div class="m-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Register</h1>
				<p class="text-balance text-muted-foreground">Fill all information below</p>
			</div>
			<form onsubmit={signUp}>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Your Username"
							bind:value={formData.username}
							required
						/>
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Your Email"
							bind:value={formData.email}
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
							placeholder="Your Password"
							bind:value={formData.password}
							required
						/>
						<span class={cn('text-sm text-red-500', validateForm.password ? 'block' : 'hidden')}
							>At least 6 characters, 1 number, and 1 capital letter</span
						>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Confirm Password</Label>
						</div>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="Confirm Your Password"
							bind:value={formData.confirmPassword}
							required
						/>
						<span
							class={cn('text-sm text-red-500', validateForm.confirmPassword ? 'block' : 'hidden')}
							>Password do not match</span
						>
						<span class="text-sm text-red-500"></span>
					</div>
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
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Login </a>
			</div>
		</div>
	</div>
</div>

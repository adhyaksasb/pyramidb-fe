<script lang="ts">
	// safely get status and message from props
	const { error, status } = $props();

	// fallback if error is missing
	const message = error?.message || 'Something went wrong';
	const statusCode = status || 500;
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
	<h1 class="text-6xl font-bold text-red-600">{statusCode}</h1>
	<p class="text-xl mt-4 text-gray-800">{message}</p>

	<a href="/" class="mt-6 text-blue-500 hover:underline">Go back home</a>
</div>
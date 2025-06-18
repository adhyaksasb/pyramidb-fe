<script lang="ts">
  export let error: Error & { status?: number };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-gray-800 px-4">
  <div class="text-center">
    <h1 class="text-6xl font-bold text-red-600">{error.status ?? 500}</h1>
  </div>
</div>

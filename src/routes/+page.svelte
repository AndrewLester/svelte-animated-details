<script lang="ts">
	import animatedDetails from 'svelte-animated-details';
	let unrelated = false;
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={() => (unrelated = !unrelated)}>Unrelated</button>

<details use:animatedDetails>
	<summary>Open me</summary>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>

	{#if unrelated}
		Yoyo
	{/if}
</details>

<style>
	details {
		overflow: hidden;
		border: 1px solid gray;
		border-radius: 5px;
		transition: height 200ms ease-out;
		height: var(--summary-height, auto);
	}

	summary {
		padding: 0.5em 1em;
	}

	details[open] > summary {
		border-bottom: 1px solid gray;
	}

	details[open] {
		height: var(--full-height, auto);
	}
</style>

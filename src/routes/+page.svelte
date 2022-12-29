<script lang="ts">
	import animatedDetails from 'svelte-animated-details';
	import { slide } from 'svelte/transition';
	let unrelated = false;
	let duration = 400;
</script>

<main>
	<h1>
		<a href="https://github.com/AndrewLester/svelte-animated-details">svelte-animated-details</a>
	</h1>

	<p>
		Try <kbd>CTRL</kbd>/<kbd>CMD</kbd> + <kbd>F</kbd> and search for content inside the `&lt;details&gt;`.
	</p>

	<p>
		Toggle a Svelte component inside the `&lt;details&gt;`:
		<button on:click={() => (unrelated = !unrelated)}>Toggle</button>
	</p>

	<p>
		<label for="duration">
			Duration:
			<input
				id="duration"
				min="0"
				max="2000"
				bind:value={duration}
				placeholder="duration"
				type="number"
			/>
		</label>
	</p>

	<h2>Simple</h2>
	<details class="simple" use:animatedDetails={{ duration }}>
		<summary>Open me</summary>
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>

		{#if unrelated}
			Yoyo
		{/if}
	</details>

	<details class="simple" use:animatedDetails>
		<summary>Code</summary>
		<pre>
{`<details class="simple" use:animatedDetails={{ duration }}>
	<summary>Open me</summary>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>
	<p>Whoa content crazy</p>

	{#if unrelated}
		Yoyo
	{/if}
</details>`}
		</pre>
	</details>

	<h2>Complex</h2>
	<details class="complex" use:animatedDetails={{ duration }}>
		<summary>Open me please</summary>
		<div class="content">
			<p>Whoa content crazy</p>
			<p>Whoa content crazy</p>
			<p>Whoa content crazy</p>
			<p>Whoa content crazy</p>

			{#if unrelated}
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2006_Ojiya_balloon_festival_011.jpg/1200px-2006_Ojiya_balloon_festival_011.jpg"
					alt="Hot air balloon stock"
					transition:slide
				/>
			{/if}
		</div>
	</details>

	<details class="simple" use:animatedDetails>
		<summary>Code</summary>
		<pre>
{`<details class="complex" use:animatedDetails={{ duration }}>
	<summary>Open me</summary>
	<div class="content">
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>
		<p>Whoa content crazy</p>

		{#if unrelated}
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2006_Ojiya_balloon_festival_011.jpg/1200px-2006_Ojiya_balloon_festival_011.jpg"
				alt="Hot air balloon stock"
				transition:slide
			/>
		{/if}
	</div>
</details>`}
		</pre>
	</details>
</main>

<style>
	/* Core styles */

	details {
		overflow: hidden;
	}

	/* Custom styles */

	details {
		max-width: 70ch;
		margin-bottom: 2em;
	}

	.simple {
		border: 1px solid gray;
		border-radius: 5px;
	}

	.simple summary {
		padding: 0.5em 1em;
	}

	.simple[open] summary {
		border-bottom: 1px solid gray;
	}

	.complex {
		border: 2px solid black;
		border-radius: 5px;
		background-color: bisque;
		writing-mode: vertical-rl;
		transform: scale(-1, -1);
	}

	.complex summary {
		display: flex;
		flex-flow: row nowrap;
		padding: 1em 2em;
		cursor: pointer;
		border-radius: 3px;
		gap: 10px;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-weight: bold;
		background-color: rgba(188, 199, 188);
		box-sizing: border-box;
		align-items: center;
	}

	.complex summary::before {
		content: '+ ';
		font-size: 1.5rem;
	}

	.complex[open] summary::before {
		content: '- ';
	}

	.complex .content {
		padding: 2em;
	}

	.complex img {
		display: block;
		max-height: 25vh;
		transform: scale(-1, -1);
	}

	pre {
		width: 100%;
		overflow-x: auto;
		margin: 0;
	}
</style>

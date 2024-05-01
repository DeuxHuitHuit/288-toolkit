<script lang="ts">
	import { page } from '$app/stores';
	import { randomInt } from '@288-toolkit/math';
	import { Dismissable } from '@288-toolkit/dismissable';

	const { status, error } = $page;

	const unknownErrorMessage = [
		'Oof...',
		'Rough stuff',
		'Get it together!',
		'Common mate',
		"Don't give up :)"
	];
	const unknownErrorMessageIndex = randomInt(0, unknownErrorMessage.length - 1);
</script>

<Dismissable key="error-page" let:close let:dismiss browserStorage="session">
	<div class="_error-overlay">
		<div class="_error-ctn">
			<div class="_btn-ctn">
				<button on:click={dismiss}>Disable for session</button>
				<button on:click={close}>Close &times;</button>
			</div>
			<h1>{status}</h1>
			{#if error}
				<pre>{JSON.stringify(error, null, 4)}</pre>
			{:else}
				<h2>Unknown error</h2>
				<h3>{unknownErrorMessage[unknownErrorMessageIndex]}</h3>
			{/if}
		</div>
	</div>
</Dismissable>

<style>
	._error-overlay {
		overflow-y: scroll;
		position: fixed;
		inset: 0;
		z-index: 999;
		display: flex;
		align-items: start;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		padding-top: 16px;
	}

	._error-ctn {
		width: 100%;
		max-width: 1200px;
		overflow-x: auto;
		border-radius: 16px;
		background-color: black;
		padding: 16px;
		font-size: 20px;
		color: white;
	}

	._error-ctn > *:not(:first-child) {
		margin-top: 24px;
	}

	._btn-ctn {
		display: flex;
		justify-content: end;
		gap: 12px;
	}

	button {
		border-radius: 8px;
		border: 2px solid currentColor;
		padding: 2px 10px;
		transition: background-color 0.1s ease;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	h1 {
		font-size: 40px;
		font-weight: bold;
	}

	h2 {
		font-size: 30px;
	}

	h3 {
		font-size: 20px;
	}

	pre {
		overflow-x: scroll;
	}
</style>

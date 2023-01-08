<script lang="ts">
	import clickOutside from '$lib/clickOutside';
	import { createEventDispatcher } from 'svelte';

	export let variables: { [key: string]: { value?: number; base?: number; label: string } };

	export let creating = false;

	const cellClassName = 'w-full h-full flex items-center justify-center text-center bg-transparent';

	let activeSymbol = '';

	const dispatch = createEventDispatcher<{
		updateNum: { symbol: string; num: number };
		updateLabel: { symbol: string; label: string };
	}>();
</script>

<div class="rounded-xl bg-gray-200 p-5 divide-y divide-white">
	{#each Object.keys(variables) as symbol}
		<!-- Svelte is cool like this -->
		{@const { label, value, base } = variables[symbol]}

		<!-- Holds the value to update and display-->
		{@const num = creating ? base : value}
		<div
			title={label}
			class="h-10 flex flex-row items-center justify-around divide-x-4 divide-white text-md"
		>
			<span class={cellClassName}>
				<!-- Making use of the styles provided by MathJax -->
				<mjx-c class="TEX-I">{symbol}</mjx-c>
			</span>
			{#if creating}
				<input
					type="text"
					value={label}
					on:input={(e) => {
						dispatch('updateLabel', { symbol, label: e.currentTarget.value });
					}}
					placeholder="Mention units"
					class={`${cellClassName} outline-none`}
				/>
			{/if}
			{#if activeSymbol === symbol}
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="number"
					class={`${cellClassName} outline-none`}
					use:clickOutside
					autofocus
					value={num}
					on:outclick={(e) => {
						if (e.detail.target instanceof HTMLInputElement) {
							if (e.detail.target.value === '') {
								e.detail.target.value = '0';
							}

							dispatch('updateNum', { symbol, num: e.detail.target.valueAsNumber });
						}

						activeSymbol = '';
					}}
				/>
			{:else}
				<button
					type="button"
					class={`${cellClassName} hover:text-gray-500`}
					on:click={() => (activeSymbol = symbol)}>{num}</button
				>
			{/if}
		</div>
	{:else}
		<h3 class="text-xl">No variables to display</h3>
	{/each}
</div>

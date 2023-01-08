<script lang="ts">
	export let editing: unknown;
	export let disabled = false;
	export let title: string;
</script>

<button
	{title}
	{disabled}
	on:click
	type="submit"
	class="disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none bg-gray-400 hover:bg-gray-400/75 rounded-xl px-5 py-2 text-lg text-white shadow-[4px_5px_0] shadow-gray-500"
>
	{#if editing}
		Update
	{:else}
		Create
	{/if}
</button>

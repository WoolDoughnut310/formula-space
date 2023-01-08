<script lang="ts">
	export let title: string;
</script>

<button
	type="submit"
	class="px-4 py-3 flex flex-row items-center bg-gray-300 hover:bg-gray-400 shadow-[4px_5px_0] shadow-gray-500 rounded-xl font-semibold"
	on:click
>
	{#if $$slots.icon}
		<div class="w-4 h-4 mr-2 ">
			<slot name="icon" />
		</div>
	{/if}
	{title}
</button>

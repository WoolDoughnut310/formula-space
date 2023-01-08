<script lang="ts">
	import { goto } from '$app/navigation';
	import FormulaPreview from '$lib/FormulaPreview.svelte';
	import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';
	import { Collection } from 'sveltefire';
</script>

<svelte:head>
	<title>Formula Space</title>
</svelte:head>

<div class="p-5 grid grid-cols-4 gap-2">
	<Collection ref="formulae" let:data>
		{#each data as formula (formula.id)}
			<FormulaPreview id={formula.id} data={formula} />
		{/each}
	</Collection>
</div>
<button
	type="button"
	on:click={() => goto('/create')}
	class="flex flex-row mx-auto absolute left-1/2 bottom-5 rounded-3xl p-4 border-gray-200 border-2 fdaf bg-slate-400 hover:bg-slate-300 text-white shadow-lg font-semibold"
>
	<div class="w-6 h-6 mr-2">
		<IoIosAdd />
	</div>
	New
</button>

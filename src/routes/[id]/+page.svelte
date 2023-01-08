<script lang="ts">
	import { page } from '$app/stores';
	import { formulaeCol } from '$lib/firestore';
	import { parseNodes } from '$lib/math';
	import type { Formula } from '$lib/types';
	import { doc, getDoc } from 'firebase/firestore';
	import { Math } from 'mathjax-svelte';
	import { parse, type MathNode } from 'mathjs';
	import TableInput from '$lib/TableInput.svelte';
	import FormulaResult from '$lib/FormulaResult.svelte';

	const id = $page.params.id;

	let formula: Formula | undefined;

	let node: MathNode;

	// For MathJax rendering
	let latex = '';

	// Reprsents the keys for the variable scope for evaluation
	let symbols: string[] = [];

	// Stores the left-hand symbol in the formula
	let assignments: string[] = [];

	// Used for scope values and hover labels
	let variables: { [key: string]: { label: string; value: number } } = {};

	(async () => {
		const snap = await getDoc(doc(formulaeCol, id));
		formula = snap.data() as Formula;
		node = parse(formula.formula ?? '');

		latex = node.toTex();

		({ symbols, assignments } = parseNodes(node));

		// Initially set values to defaults
		variables = Object.fromEntries(
			symbols.map((symbol) => {
				const { label, base } = (formula as Formula).variables[symbol];
				return [symbol, { label, value: base }];
			})
		);
	})();

	// Form an object mapping symbol name to value
	$: output = node?.evaluate(
		Object.fromEntries(symbols.map((symbol) => [symbol, variables[symbol].value]))
	);
</script>

<svelte:head>
	<title>{formula?.title ?? 'Loading...'}</title>
</svelte:head>

<div class="p-4 text-center relative">
	<!-- Handle loading state for the document -->
	<h2 class="text-3xl font-semibold">{formula?.title ?? 'Loading...'}</h2>
	{#if formula}
		<sub class="text-lg">By {formula.author}</sub>
	{/if}
	<a
		href={`/create?edit=${id}`}
		class="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 shadow-[4px_5px_0] shadow-gray-500"
	>
		Edit
	</a>
	<Math
		class="bg-gray-300/50 rounded-2xl mt-12 h-24 flex justify-center items-center text-2xl"
		t={latex}
	/>
	<FormulaResult {assignments} {output} />
	<div class="mx-auto w-3/4 text-center mt-10">
		<h3 class="font-semibold text-xl">Variables</h3>
		<div class="flex flex-row justify-space-around space-x-8 border-b-2 uppercase font-medium">
			<span class="flex-1">Name</span>
			<span class="flex-1">Value</span>
		</div>
		<TableInput
			bind:variables
			on:updateNum={(e) => (variables[e.detail.symbol].value = e.detail.num)}
		/>
	</div>
</div>

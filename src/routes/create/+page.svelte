<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { formulaeCol } from '$lib/firestore';
	import { parseNodes } from '$lib/math';
	import { Math } from 'mathjax-svelte';
	import TableInput from '$lib/TableInput.svelte';
	import type { Formula } from '$lib/types';
	import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
	import { parse, type MathNode } from 'mathjs';
	import { userStore } from 'sveltefire';
	import { onMount, tick } from 'svelte';
	import FormulaInput from '$lib/FormulaInput.svelte';
	import FormulaSubmitButton from '$lib/FormulaSubmitButton.svelte';

	const user = userStore(auth);

	const editing = $page.url.searchParams.get('edit');

	let title = '';
	let math = '';

	let node: MathNode;
	let latex = '';
	let symbols: string[] = [];
	let assignments: string[] = [];

	let error = '';

	let variables: Formula['variables'] = {};

	onMount(async () => {
		// Override with previous values if editing
		if (editing) {
			const snap = await getDoc(doc(formulaeCol, editing));
			const formula = snap.data() as Formula;

			title = formula.title;
			math = formula.formula;
			// Wait before overriding variable defaults
			await tick();
			variables = formula.variables;
		}
	});

	$: {
		try {
			node = parse(math);

			latex = node.toTex();

			({ symbols, assignments } = parseNodes(node));

			variables = Object.fromEntries(symbols.map((symbol) => [symbol, { label: '', base: 0 }]));
		} catch (err) {
			error = (err as Error).name;
		}
	}

	const onSubmit = async () => {
		if (!$user) return;

		const data: Formula = {
			userId: $user.uid,
			author: $user.displayName ?? `User (${$user.uid})`,
			formula: math,
			title,
			variables
		};

		let id: string;

		if (editing) {
			await setDoc(doc(formulaeCol, editing), data);
			id = editing;
		} else {
			const docRef = await addDoc(formulaeCol, data);
			id = docRef.id;
		}

		// View the formula's page
		await goto(`/${id}`);
	};

	$: disabled = !($user && title && math);
	$: buttonTitle = !$user ? 'Need to be logged in' : '';
</script>

<svelte:head>
	<title>{editing ? 'Editing' : 'Creating'} {title ? `"${title}"` : 'new formula'}</title>
</svelte:head>
<div class="p-4 text-center container mx-auto">
	<div class="p-5 flex justify-center items-center rounded-xl bg-gray-300/40">
		<input
			class="text-3xl font-semibold w-full text-center bg-transparent outline-none"
			bind:value={title}
			placeholder="Enter formula title"
		/>
	</div>
	<div
		class="mt-12 mx-10 bg-gray-300/50 rounded-2xl h-24 flex justify-center items-center text-2xl shadow-lg"
	>
		{#if error}
			<span class="font-mono">{error}</span>
		{:else}
			<Math display={false} class="w-full h-full flex justify-center items-center" t={latex} />
		{/if}
	</div>
	<div class="p-4 flex justify-center items-center space-x-3">
		<!-- Shows the symbol used at the left-hand side of the formula -->
		{#each assignments as assignment}
			<div class="bg-gray-200 rounded-md px-4 py-2 w-10 shadow">{assignment}</div>
		{/each}
	</div>
	<FormulaInput on:input={() => (error = '')} bind:math />
	<div class="mx-auto w-3/4 text-center mt-10">
		<h3 class="font-semibold text-xl">Variables</h3>
		<div class="flex flex-row justify-space-around space-x-8 border-b-2 uppercase font-medium">
			<span class="flex-1">Name</span>
			<span class="flex-1">Label</span>
			<span class="flex-1">Default</span>
		</div>
		<TableInput
			creating
			bind:variables
			on:updateNum={(e) => (variables[e.detail.symbol].base = e.detail.num)}
		/>
	</div>
	<div class="mt-5 flex flex-row justify-end">
		<FormulaSubmitButton {editing} title={buttonTitle} {disabled} on:click={onSubmit} />
	</div>
</div>

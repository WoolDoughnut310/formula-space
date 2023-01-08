<script lang="ts">
	export let assignments: string[];
	export let output: number;
</script>

<div class="mx-auto w-1/4 mt-10">
	<h3 class="font-semibold text-xl">Output</h3>
	<div class="bg-gray-300 rounded-xl p-4">
		{#each assignments as assignment}
			<p>{assignment} = {output}</p>
		{/each}
	</div>
</div>

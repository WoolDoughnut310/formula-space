<script lang="ts">
	import type { Formula } from '$lib/types';

	export let id: string;
	export let data: Formula;
</script>

<a href="/{id}" class="active:translate-y-4 active:translate-x-4 transition-all">
	<div
		class="shadow flex flex-col justify-center p-3 h-28 border-slate-600 border-2 rounded-2xl bg-gray-200/75 text-center"
	>
		<h3 class="text-xl">{data.title}</h3>
		<span>by {data.author}</span>
	</div>
</a>

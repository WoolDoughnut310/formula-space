<script lang="ts">
	export let math = '';
</script>

<input
	placeholder="Enter formula"
	type="text"
	class="mx-auto my-10 flex flex-row text-center items-center w-1/2 h-16 bg-gray-300/40 border-2 border-slate-600 rounded-lg"
	on:input
	bind:value={math}
/>

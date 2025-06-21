<!-- 
  Instructions:
  1. Open the file `src/lib/components/Filters.svelte`.
  2. Replace ALL of its content with this new code.
-->

<!-- FILE: src/lib/components/Filters.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	/** @type {string} */
	export let selectedBU;
	/** @type {string} */
	export let selectedFunction;
	/** @type {{start: string, end: string}} */
	export let dateRange;

	/** @type {string[] | undefined} */
	export let businessUnits = [];
	/** @type {string[] | undefined} */
	export let functions = [];

	const dispatch = createEventDispatcher();

	function dispatchChange() {
		// This function tells the parent page that a filter has changed.
		dispatch('change', {
			bu: selectedBU,
			func: selectedFunction,
			dateRange: dateRange
		});
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
	<div class="grid grid-cols-1 lg:grid-cols-10 gap-x-6 gap-y-4 items-center">
		<!-- Business Unit Filters -->
		<div class="lg:col-span-5 flex gap-2 overflow-x-auto pb-2">
			{#if businessUnits}
				{#each businessUnits as unit}
					<button
						type="button"
						on:click={() => { selectedBU = unit; dispatchChange(); }}
						class="px-4 py-2 text-sm rounded-lg font-semibold transition whitespace-nowrap {selectedBU === unit
							? 'bg-blue-600 text-white shadow-lg scale-105'
							: 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}"
					>
						{unit}
					</button>
				{/each}
			{/if}
		</div>

		<!-- Function Filter -->
		<div class="lg:col-span-2">
			<select
				bind:value={selectedFunction}
				on:change={dispatchChange}
				class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none"
			>
				{#if functions}
					{#each functions as func}
						<option value={func} class="bg-gray-800 text-white">{func}</option>
					{/each}
				{/if}
			</select>
		</div>

		<!-- Date Range Filters -->
		<div class="lg:col-span-3 flex gap-2 items-center">
			<input
				type="date"
				bind:value={dateRange.start}
				on:change={dispatchChange}
				class="w-full px-2 py-2 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white"
			/>
			<span class="text-gray-500">-</span>
			<input
				type="date"
				bind:value={dateRange.end}
				on:change={dispatchChange}
				class="w-full px-2 py-2 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white"
			/>
		</div>
	</div>
</div>

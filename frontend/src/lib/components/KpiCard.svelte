<!-- FILE: src/lib/components/KpiCard.svelte -->
<script>
  /** @type {string} */
  export let label;
  /** @type {string | number} */
  export let value;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('kpiClick', { label: label });
  }
</script>

<div
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
  class="bg-gray-800/60 p-4 rounded-lg shadow-md h-24 cursor-pointer hover:bg-gray-700/80 transition-colors flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <h4 class="text-sm font-medium text-gray-400">{label}</h4>
  <p class="text-2xl font-bold text-white">{value}</p>
</div>

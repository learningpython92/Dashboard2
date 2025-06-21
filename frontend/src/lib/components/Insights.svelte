<!--
  Instructions:
  1. Open the empty file at `src/lib/components/Insights.svelte`.
  2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/Insights.svelte -->
<script>
  /**
   * An array of insight strings or objects.
   * @type {(string|object)[]}
   */
  export let insights = [];

  /**
   * Loading state for the insights section.
   * @type {boolean}
   */
  export let loading = false;

  // These titles will be used for the insight cards if not provided by the object.
  const titles = ['Key Observation', 'Potential Risk', 'Recommendation'];
</script>

<section>
  <h2 class="text-xl font-semibold text-white mb-4">AI-Driven Insights</h2>

  {#if loading}
    <div class="text-center text-gray-500 p-6">Generating AI Insights...</div>
  {:else if !insights || !insights.length}
    <div class="text-center text-gray-500 p-6">No insights for current selection.</div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each insights as insight, idx}
        {#if typeof insight === 'string'}
          <div class="bg-gray-800/60 p-6 rounded-lg shadow-md">
            <h3 class="text-blue-400 font-semibold mb-2">{titles[idx] || 'Insight'}</h3>
            <p class="text-gray-400 text-sm">{insight}</p>
          </div>
        {:else}
          <div class="bg-gray-800/60 p-6 rounded-lg shadow-md">
            <h3 class="text-blue-400 font-semibold mb-2">{insight.title || titles[idx] || 'Insight'}</h3>
            <p class="text-gray-400 text-sm">{insight.description}</p>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</section>

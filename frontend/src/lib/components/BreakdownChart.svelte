<!-- FILE: src/lib/components/BreakdownChart.svelte -->
<script>
  /** @type {any[]} */
  export let data = [];
</script>
<div class="bg-gray-800/60 p-6 rounded-lg shadow-md">
  <h4 class="font-semibold text-gray-200 mb-4">Function-wise Comparison</h4>
  <!-- Chart will go here later -->
  <pre class="text-xs text-green-300 bg-gray-900 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
</div>
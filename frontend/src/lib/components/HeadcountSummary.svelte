<!--
  Instructions:
  1. Open the empty file at `src/lib/components/HeadcountSummary.svelte`.
  2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/HeadcountSummary.svelte -->
<script>
  /**
   * Data for the headcount summary.
   * @type {{total: number, available: number, gap: number}}
   */
  export let headcount = { total: 0, available: 0, gap: 0 };

  /**
   * A simple Stat Card component for reuse within this file.
   * @type {any}
   */
  import StatCard from './StatCard.svelte';
</script>

<section>
  <h2 class="text-xl font-semibold text-white mb-4">Headcount Overview</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatCard title="Total Headcount" value={headcount.total} color="blue" />
    <StatCard title="Available Headcount" value={headcount.available} color="green" />
    <StatCard title="Open Positions (Gap)" value={headcount.gap} color="orange" />
  </div>
</section>

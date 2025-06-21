<!--
  Instructions:
  1. Open the empty file at `src/lib/components/KpiGrid.svelte`.
  2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/KpiGrid.svelte -->
<script>
  import KpiCard from './KpiCard.svelte';

  /**
   * The map of KPI data, e.g., { 'Total Hires': 100, ... }
   * @type {Object.<string, string|number> | null}
   */
  export let kpis = null;

  // This defines the order and labels for the KPI cards
  const KPI_LABELS = [
    'Total Hires',
    'Avg. Time to Fill',
    'Avg. Cost Per Hire',
    'IJP Adherence',
    'Build Ratio',
    'Diversity Ratio',
  ];
</script>

<section>
  <h2 class="text-xl font-semibold text-white mb-4">Key Performance Indicators</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each KPI_LABELS as label}
      <KpiCard {label} value={kpis ? kpis[label] : '—'} />
    {/each}
  </div>
</section>

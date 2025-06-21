<script>
  import { page } from '$app/stores';
  import * as api from '$lib/api.js';

  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import TrendChart from '$lib/components/TrendChart.svelte';
  import BreakdownChart from '$lib/components/BreakdownChart.svelte';
  import Insights from '$lib/components/Insights.svelte';

  let drilldownData = null;
  let loading = true;
  let error = null;

  // Compose a dependency string for reactivity
  $: depString = `${$page.params.kpi}|${$page.url.searchParams.toString()}`;

  $: if (depString) {
    (async () => {
      loading = true;
      error = null;
      drilldownData = null;

      const kpiKey = $page.params.kpi;
      const searchParams = $page.url.searchParams;
      const filters = {
        business_group: searchParams.get('business_group'),
        function: searchParams.get('function')
      };

      try {
        drilldownData = await api.getKpiDrilldown(kpiKey, filters);
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    })();
  }
</script>

<div class="min-h-screen bg-gray-900 text-gray-300 p-6 font-sans">
  <div class="max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-white">
        Drilldown: <span class="text-blue-400">{$page.params.kpi}</span>
      </h1>
      <a href="/" class="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
        ← Back to Dashboard
      </a>
    </div>

    <!-- Main Content -->
    {#if loading}
      <div class="text-center py-20">
        <LoadingSpinner />
      </div>
    {:else if error}
      <ErrorMessage message={error} />
    {:else if drilldownData}
      <div class="space-y-8 animate-fade-in">
        <!-- Charts Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart data={drilldownData.trend_chart_data} />
          <BreakdownChart data={drilldownData.breakdown_chart_data} />
        </section>

        <!-- AI Insights Section -->
        <Insights insights={drilldownData.ai_insights.insights} loading={false} />
      </div>
    {/if}
  </div>
</div>

<!-- 
  Instructions:
  1. Open the file `src/routes/+page.svelte`.
  2. Replace ALL of its content with this code.
-->

<!-- FILE: src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // <-- Added this import
  import Header from '$lib/components/Header.svelte';
  import Filters from '$lib/components/Filters.svelte';
  import HeadcountSummary from '$lib/components/HeadcountSummary.svelte';
  import KpiGrid from '$lib/components/KpiGrid.svelte';
  import Insights from '$lib/components/Insights.svelte';
  import * as api from '$lib/api.js';

  // State for filter options
  let businessUnits = ['All Units'];
  let functions = ['All Functions'];

  // Use separate variables for each filter
  let selectedBU = 'All Units';
  let selectedFunction = 'All Functions';
  let dateRange = { start: '2025-01-01', end: '2025-12-31' };

  // State for dashboard data
  let headcountData = { total: 0, available: 0, gap: 0 };
  let kpiData = null;
  let insightsData = [];
  let loading = true;
  let insightsLoading = true;
  let error = null;

  // Fetch filter options and initial data on mount
  onMount(async () => {
    try {
      const { businessGroups, functions: funcs } = await api.getFilterOptions();
      businessUnits = ['All Units', ...businessGroups];
      functions = ['All Functions', ...funcs];
    } catch (e) {
      error = 'Failed to load filter options.';
    }
  });

  // Fetch dashboard data whenever any filter changes
  $: fetchDashboardData(selectedBU, selectedFunction, dateRange);

  async function fetchDashboardData(bu, func, range) {
    loading = true;
    insightsLoading = true;
    error = null;
    const filters = {
      business_group: bu === 'All Units' ? '' : bu,
      function: func === 'All Functions' ? '' : func,
      start_date: range.start,
      end_date: range.end
    };
    try {
      // Fetch headcount summary
      const summaries = await api.getBusinessSummaries();
      headcountData = calculateHeadcount(summaries, bu, func);
      // Fetch KPI data
      kpiData = shapeKpiData(await api.getKpiAverages(filters));
    } catch (e) {
      error = 'Failed to load dashboard data.';
      kpiData = null;
    } finally {
      loading = false;
    }
    try {
      const ai = await api.getAiInsights(filters);
      insightsData = ai.insights || [];
    } catch (e) {
      insightsData = ['⚠️ Failed to generate insights.'];
    } finally {
      insightsLoading = false;
    }
  }
  
  // --- ADDED THIS FUNCTION ---
  // Handles the click event from the KpiGrid component
  function handleKpiClick(event) {
    const kpiLabel = event.detail.label;
    const bu = selectedBU === 'All Units' ? '' : selectedBU;
    const func = selectedFunction === 'All Functions' ? '' : selectedFunction;
    const params = new URLSearchParams({ business_group: bu, function: func });

    // Navigates to the drilldown page with the correct KPI and filters
    goto(`/drilldown/${kpiLabel}?${params.toString()}`);
  }

  // Helper to shape KPI data for display
  function shapeKpiData(rawKpis) {
    if (!rawKpis) return null;
    const fmt = (v) => (v === null || v === undefined ? '—' : (+v).toLocaleString(undefined, { maximumFractionDigits: 1 }));
    return {
      'Total Hires': fmt(rawKpis.total_hires),
      'Avg. Time to Fill': fmt(rawKpis.avg_time_to_fill),
      'Avg. Cost Per Hire': '$' + fmt(rawKpis.avg_cost_per_hire),
      'IJP Adherence': fmt(rawKpis.ijp_adherence_rate) + '%',
      'Build Ratio': fmt(rawKpis.build_buy_rate) + '%',
      'Diversity Ratio': fmt(rawKpis.diversity_hire_rate) + '%'
    };
  }

  // Helper to calculate headcount summary
  function calculateHeadcount(summaries, bu, func) {
    if (!summaries || summaries.length === 0) return { total: 0, available: 0, gap: 0 };
    const isAllUnits = bu === 'All Units';
    const isAllFuncs = func === 'All Functions';
    let filteredSummaries = summaries;
    if (!isAllUnits) {
      filteredSummaries = filteredSummaries.filter((s) => s.business_group === bu);
    }
    if (!isAllFuncs) {
      filteredSummaries = filteredSummaries.filter((s) => s.function === func);
    }
    return filteredSummaries.reduce(
      (acc, s) => ({
        total: acc.total + s.total_headcount,
        available: acc.available + s.available_headcount,
        gap: acc.gap + s.gap
      }),
      { total: 0, available: 0, gap: 0 }
    );
  }
</script>

<div class="min-h-screen bg-gray-900 text-gray-300 p-6 font-sans">
  <div class="max-w-screen-xl mx-auto">
    <Header />

    {#if error}
      <div class="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-8 animate-fade-in">{error}</div>
    {/if}

    <Filters
      bind:selectedBU
      bind:selectedFunction
      bind:dateRange
      {businessUnits}
      {functions}
    />

    <main class="space-y-8 mt-8">
      <HeadcountSummary headcount={headcountData} />
      <!-- MODIFIED THIS LINE -->
      <KpiGrid kpis={kpiData} loading={loading} on:kpiClick={handleKpiClick} />
      <Insights insights={insightsData} loading={insightsLoading} />
    </main>
  </div>
</div>

<!--
    Instructions:
    1. Create a new file at `src/lib/components/StatCard.svelte`.
    2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/StatCard.svelte -->
<script>
    /** @type {string} */
    export let title;
    /** @type {number} */
    export let value;
    /** @type {string} */
    export let color;

    const fmt = (v) =>
      v === null || v === undefined || !Number.isFinite(+v)
        ? '—'
        : Number.isInteger(+v)
        ? (+v).toLocaleString()
        : (+v).toFixed(1);

    // This is a trick to make Tailwind recognize dynamic classes.
    // Do not remove these comments.
    // text-blue-300 border-blue-700/50 from-blue-900/50
    // text-green-300 border-green-700/50 from-green-900/50
    // text-orange-300 border-orange-700/50 from-orange-900/50
</script>

<div class={`bg-gradient-to-br from-${color}-900/50 to-gray-900/50 p-6 rounded-lg shadow-lg border border-${color}-700/50`}>
    <h3 class={`text-sm font-semibold text-${color}-300`}>{title}</h3>
    <p class="text-3xl font-bold text-white mt-2">{fmt(value)}</p>
</div>

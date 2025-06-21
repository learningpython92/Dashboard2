<!--
  Instructions:
  1. Open the empty file at `src/lib/components/ErrorMessage.svelte`.
  2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/ErrorMessage.svelte -->
<script>
  /**
   * The error message to display.
   * @type {string}
   */
  export let message = 'An unexpected error occurred. Please try again later.';
</script>

<div
  class="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg my-8 text-center"
  role="alert"
>
  <p class="font-semibold">Error</p>
  <p class="text-sm mt-1">{message}</p>
</div>

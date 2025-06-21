<!--
  Instructions:
  1. Open the empty file at `src/lib/components/LoadingSpinner.svelte`.
  2. Copy and paste the code below into it.
-->

<!-- FILE: src/lib/components/LoadingSpinner.svelte -->
<div class="spinner" role="status" aria-label="loading">
  <div class="dot1"></div>
  <div class="dot2"></div>
</div>

<style>
  .spinner {
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    animation: sk-rotate 2s infinite linear;
  }

  .dot1,
  .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #3b82f6; /* blue-500 */
    border-radius: 100%;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .dot2 {
    top: auto;
    bottom: 0;
    background-color: #60a5fa; /* blue-400 */
    animation-delay: -1s;
  }

  @keyframes sk-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
</style>

export function createError(onRetry) {
  const errorHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-20">
      <!-- Error Icon -->
      <div class="w-20 h-20 mb-6 flex items-center justify-center">
        <svg class="w-full h-full text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <!-- Error Message -->
      <h3 class="text-xl text-text-primary font-semibold mb-2">
        Erro ao carregar filmes
      </h3>

      <p class="text-text-primary/60 mb-6 text-center max-w-md">
        Não foi possível conectar ao banco de dados. Verifique sua conexão com a internet e tente novamente.
      </p>

      <!-- Retry Button -->
      <button
        id="retry-button"
        class="px-6 py-3 bg-accent-pink/20 border-2 border-accent-pink rounded-lg text-accent-pink font-medium hover:bg-accent-pink/30 transition-all duration-300 flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Tentar Novamente</span>
      </button>
    </div>
  `

  return errorHTML
}

/**
 * Render error state with retry functionality
 * @param {HTMLElement} container - Container element to render into
 * @param {Function} onRetry - Callback function when retry is clicked
 */
export function renderError(container, onRetry) {
  container.innerHTML = createError()

  // Attach retry event listener
  const retryButton = container.querySelector('#retry-button')
  if (retryButton && onRetry) {
    retryButton.addEventListener('click', onRetry)
  }
}

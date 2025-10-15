export function createLoading() {
  const loadingHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-20">
      <!-- Animated Spinner -->
      <div class="relative w-16 h-16 mb-6">
        <div class="absolute inset-0 border-4 border-accent-blue/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-transparent border-t-accent-blue rounded-full animate-spin"></div>
      </div>

      <!-- Loading Text -->
      <p class="text-lg text-text-primary/70 font-medium">
        Carregando filmes...
      </p>

      <!-- Subtitle -->
      <p class="text-sm text-text-primary/40 mt-2">
        Aguarde um momento
      </p>
    </div>
  `

  return loadingHTML
}

// Add custom spin animation to CSS if not already present
const style = document.createElement('style')
style.textContent = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
`

// Only add if not already added
if (!document.querySelector('#loading-styles')) {
  style.id = 'loading-styles'
  document.head.appendChild(style)
}

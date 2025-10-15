export function createSearchBar() {
  const searchBarHTML = `
    <div class="relative">
      <div class="relative">
        <input
          type="text"
          id="search-input"
          placeholder="Buscar filmes por título ou diretor..."
          class="w-full px-4 py-3 pl-12 bg-bg-primary border-2 border-accent-blue/30 rounded-lg text-text-primary placeholder-text-primary/40 focus:outline-none focus:border-accent-blue transition-colors duration-300"
        />
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-blue/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Autocomplete Suggestions (hidden by default) -->
      <div
        id="search-suggestions"
        class="hidden absolute z-10 w-full mt-2 bg-bg-primary border-2 border-accent-blue/30 rounded-lg shadow-lg max-h-64 overflow-y-auto"
      >
        <!-- Suggestions will be populated here -->
      </div>
    </div>
  `

  return searchBarHTML
}

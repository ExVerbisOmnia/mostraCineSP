export function createFilterPanel() {
  const filters = [
    {
      id: 'director',
      label: 'Diretor',
      options: [
        'Justine Triet',
        'Christopher Nolan',
        'Greta Gerwig',
        'Martin Scorsese',
        'Yorgos Lanthimos',
      ],
    },
    {
      id: 'room',
      label: 'Sala',
      options: ['Sala 1', 'Sala 2', 'Sala 3', 'Sala IMAX', 'Sala VIP'],
    },
    {
      id: 'country',
      label: 'País',
      options: ['França', 'EUA', 'Reino Unido', 'Brasil', 'Japão', 'Coreia do Sul'],
    },
    {
      id: 'duration',
      label: 'Duração',
      options: [
        '< 90 min',
        '90-120 min',
        '120-150 min',
        '> 150 min',
      ],
    },
    {
      id: 'time',
      label: 'Horário',
      options: [
        'Manhã (até 12h)',
        'Tarde (12h-18h)',
        'Noite (18h-22h)',
        'Madrugada (após 22h)',
      ],
    },
    {
      id: 'rating',
      label: 'Nota TMDB',
      options: ['9-10', '7-8.9', '5-6.9', '3-4.9', '< 3'],
    },
  ]

  const filterHTML = `
    <div class="flex flex-wrap gap-3">
      ${filters
        .map(
          filter => `
        <div class="relative filter-dropdown">
          <button
            type="button"
            class="px-4 py-2 bg-bg-primary border-2 border-accent-pink/30 rounded-lg text-text-primary hover:border-accent-pink transition-colors duration-300 flex items-center gap-2"
            data-filter="${filter.id}"
          >
            <span>${filter.label}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu (hidden by default) -->
          <div
            class="hidden absolute z-20 mt-2 w-56 bg-bg-primary border-2 border-accent-pink/30 rounded-lg shadow-xl p-3"
            data-dropdown="${filter.id}"
          >
            ${filter.options
              .map(
                (option, index) => `
              <label class="flex items-center gap-2 py-2 px-2 hover:bg-accent-pink/10 rounded cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  name="${filter.id}"
                  value="${option}"
                  class="w-4 h-4 accent-accent-pink"
                />
                <span class="text-sm text-text-primary">${option}</span>
              </label>
            `
              )
              .join('')}
          </div>
        </div>
      `
        )
        .join('')}

      <!-- Clear All Filters Button -->
      <button
        id="clear-filters"
        type="button"
        class="px-4 py-2 bg-accent-blue/20 border-2 border-accent-blue/30 rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors duration-300"
      >
        Limpar Filtros
      </button>
    </div>
  `

  return filterHTML
}

// Simple toggle functionality for dropdowns (visual only for now)
export function initFilterDropdowns() {
  const filterButtons = document.querySelectorAll('[data-filter]')

  filterButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation()
      const filterId = button.getAttribute('data-filter')
      const dropdown = document.querySelector(`[data-dropdown="${filterId}"]`)

      // Close all other dropdowns
      document.querySelectorAll('[data-dropdown]').forEach(dd => {
        if (dd !== dropdown) {
          dd.classList.add('hidden')
        }
      })

      // Toggle current dropdown
      dropdown.classList.toggle('hidden')
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('[data-dropdown]').forEach(dd => {
      dd.classList.add('hidden')
    })
  })
}

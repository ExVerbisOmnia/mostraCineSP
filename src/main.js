import './assets/styles/main.css'
import { createSearchBar } from './components/SearchBar.js'
import {
  createFilterPanel,
  initFilterDropdowns,
} from './components/FilterPanel.js'
import { createFilmeCard, mockFilmes } from './components/FilmeCard.js'

console.log('Mostra SP - Development Mode')
console.log('Tailwind CSS v4 loaded!')

// Render Search Bar
const searchBarContainer = document.getElementById('search-bar-container')
if (searchBarContainer) {
  searchBarContainer.innerHTML = createSearchBar()
}

// Render Filter Panel
const filterPanelContainer = document.getElementById('filter-panel-container')
if (filterPanelContainer) {
  filterPanelContainer.innerHTML = createFilterPanel()
  initFilterDropdowns()
}

// Render Film Cards
const filmsGrid = document.getElementById('films-grid')
if (filmsGrid) {
  filmsGrid.innerHTML = mockFilmes
    .map(filme => createFilmeCard(filme))
    .join('')
}
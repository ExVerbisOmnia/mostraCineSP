import './assets/styles/main.css'
import { createSearchBar } from './components/SearchBar.js'
import {
  createFilterPanel,
  initFilterDropdowns,
} from './components/FilterPanel.js'
import { createFilmeCard } from './components/FilmeCard.js'
import { createLoading } from './components/Loading.js'
import { createError, renderError } from './components/Error.js'
import { createEmptyState } from './components/EmptyState.js'
import { subscribeToFilms } from './services/filmService.js'

console.log('Mostra SP - Development Mode')
console.log('Tailwind CSS v4 loaded!')

// Application State
let films = []
let unsubscribe = null

// DOM Elements
const searchBarContainer = document.getElementById('search-bar-container')
const filterPanelContainer = document.getElementById('filter-panel-container')
const filmsGrid = document.getElementById('films-grid')

// ========================================
// UI RENDERING FUNCTIONS
// ========================================

/**
 * Show loading state in films grid
 */
function showLoading() {
  if (filmsGrid) {
    filmsGrid.innerHTML = createLoading()
  }
}

/**
 * Show error state in films grid
 */
function showError() {
  if (filmsGrid) {
    renderError(filmsGrid, initializeFirebase)
  }
}

/**
 * Show empty state when no films exist
 */
function showEmptyState() {
  if (filmsGrid) {
    filmsGrid.innerHTML = createEmptyState()
  }
}

/**
 * Render films to the grid
 * @param {Array} filmsData - Array of film objects
 */
function renderFilms(filmsData) {
  if (!filmsGrid) return

  if (filmsData.length === 0) {
    showEmptyState()
    return
  }

  filmsGrid.innerHTML = filmsData.map(filme => createFilmeCard(filme)).join('')
}

// ========================================
// FIREBASE INITIALIZATION
// ========================================

/**
 * Initialize Firebase connection and subscribe to real-time updates
 */
function initializeFirebase() {
  console.log('Initializing Firebase connection...')
  showLoading()

  // Unsubscribe from previous listener if exists
  if (unsubscribe) {
    unsubscribe()
  }

  // Subscribe to real-time film updates
  unsubscribe = subscribeToFilms(
    filmsData => {
      console.log(`Received ${filmsData.length} films from Firestore`)
      films = filmsData
      renderFilms(films)
    },
    error => {
      console.error('Firebase error:', error)
      showError()
    }
  )
}

// ========================================
// APP INITIALIZATION
// ========================================

/**
 * Initialize the application
 */
function initializeApp() {
  // Render Search Bar
  if (searchBarContainer) {
    searchBarContainer.innerHTML = createSearchBar()
  }

  // Render Filter Panel
  if (filterPanelContainer) {
    filterPanelContainer.innerHTML = createFilterPanel()
    initFilterDropdowns()
  }

  // Initialize Firebase and load films
  initializeFirebase()
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

// ========================================
// CLEANUP
// ========================================

/**
 * Cleanup Firebase listeners on page unload
 */
window.addEventListener('beforeunload', () => {
  if (unsubscribe) {
    console.log('Unsubscribing from Firebase listeners...')
    unsubscribe()
  }
})
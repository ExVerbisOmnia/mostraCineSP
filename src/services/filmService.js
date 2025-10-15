import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase.js'

/**
 * Subscribe to real-time updates for all films
 * @param {Function} callback - Called with array of films when data changes
 * @param {Function} errorCallback - Called when an error occurs
 * @returns {Function} Unsubscribe function
 */
export function subscribeToFilms(callback, errorCallback) {
  const filmsCollection = collection(db, 'filmes')
  const q = query(filmsCollection, orderBy('titulo', 'asc'))

  return onSnapshot(
    q,
    snapshot => {
      const films = []
      snapshot.forEach(docSnap => {
        films.push({ id: docSnap.id, ...docSnap.data() })
      })
      console.log(`Loaded ${films.length} films from Firestore`)
      callback(films)
    },
    error => {
      console.error('Error fetching films:', error)
      errorCallback(error)
    }
  )
}

/**
 * Get a single film by ID
 * @param {string} filmId - The film document ID
 * @returns {Promise<Object>} The film data
 */
export async function getFilmById(filmId) {
  try {
    const filmDoc = doc(db, 'filmes', filmId)
    const filmSnap = await getDoc(filmDoc)

    if (filmSnap.exists()) {
      return { id: filmSnap.id, ...filmSnap.data() }
    } else {
      throw new Error('Film not found')
    }
  } catch (error) {
    console.error('Error getting film:', error)
    throw error
  }
}

/**
 * Get all films once (no real-time updates)
 * @returns {Promise<Array>} Array of films
 */
export async function getAllFilms() {
  try {
    const filmsCollection = collection(db, 'filmes')
    const q = query(filmsCollection, orderBy('titulo', 'asc'))
    const snapshot = await getDocs(q)

    const films = []
    snapshot.forEach(docSnap => {
      films.push({ id: docSnap.id, ...docSnap.data() })
    })

    return films
  } catch (error) {
    console.error('Error getting all films:', error)
    throw error
  }
}

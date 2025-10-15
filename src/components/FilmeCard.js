/**
 * Format date from YYYY-MM-DD to DD/MM/YYYY (Brazilian format)
 */
function formatDateBR(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

/**
 * Find the next upcoming session from sessoes array
 */
function getNextSession(sessoes) {
  if (!sessoes || !Array.isArray(sessoes) || sessoes.length === 0) {
    return null
  }

  const now = new Date()
  now.setHours(0, 0, 0, 0) // Reset to start of day for comparison

  // Filter future sessions and sort by date
  const futureSessions = sessoes
    .filter(sessao => {
      if (!sessao.data) return false
      const sessionDate = new Date(sessao.data + 'T00:00:00')
      return sessionDate >= now
    })
    .sort((a, b) => {
      const dateA = new Date(a.data + 'T' + (a.horario || '00:00'))
      const dateB = new Date(b.data + 'T' + (b.horario || '00:00'))
      return dateA - dateB
    })

  return futureSessions.length > 0 ? futureSessions[0] : sessoes[0]
}

export function createFilmeCard(filme) {
  const { titulo, diretor, pais, duracao, nota, sinopse, sessoes } = filme

  // Handle missing fields gracefully
  const displayTitulo = titulo || 'Título não disponível'
  const displayDiretor = diretor || 'Não informado'
  const displayPais = pais || 'Não informado'
  const displayDuracao = duracao || '?'
  const displaySinopse = sinopse || 'Sinopse não disponível.'

  // Format next session
  const nextSession = getNextSession(sessoes)
  const sessionText = nextSession
    ? `${nextSession.sala || 'Sala'} - ${formatDateBR(nextSession.data)} às ${nextSession.horario || '??:??'}`
    : 'Sem sessões programadas'

  // Rating color based on score
  const getRatingColor = rating => {
    if (rating >= 8) return 'text-green-400'
    if (rating >= 6) return 'text-accent-blue'
    if (rating >= 4) return 'text-yellow-400'
    return 'text-red-400'
  }

  const cardHTML = `
    <div class="filme-card bg-bg-primary border-2 border-accent-blue/20 rounded-lg p-5 hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10 group">
      <!-- Header: Title + Rating -->
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300 flex-1">
          ${displayTitulo}
        </h3>
        ${
          nota
            ? `
          <div class="ml-3 flex items-center gap-1">
            <svg class="w-5 h-5 ${getRatingColor(nota)}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm font-bold ${getRatingColor(nota)}">${nota.toFixed(1)}</span>
          </div>
        `
            : ''
        }
      </div>

      <!-- Director & Country -->
      <div class="mb-3 space-y-1">
        <p class="text-sm text-text-primary/70">
          <span class="font-medium">Direção:</span> ${displayDiretor}
        </p>
        <p class="text-sm text-text-primary/70">
          <span class="font-medium">País:</span> ${displayPais} | ${displayDuracao} min
        </p>
      </div>

      <!-- Synopsis -->
      <p class="text-sm text-text-primary/60 mb-4 line-clamp-3">
        ${displaySinopse}
      </p>

      <!-- Next Session -->
      <div class="pt-3 border-t border-accent-pink/20">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs text-accent-pink font-medium">
            ${sessionText}
          </p>
        </div>
      </div>
    </div>
  `

  return cardHTML
}

// Mock data for testing
export const mockFilmes = [
  {
    id: '1',
    titulo: 'Anatomy of a Fall',
    diretor: 'Justine Triet',
    pais: 'França',
    duracao: 152,
    nota: 7.8,
    sinopse:
      'Uma mulher é suspeita da morte de seu marido, que foi encontrado morto no pé de sua casa. Seu filho cego é a única testemunha do incidente.',
    sessoes: [
      { sala: 'Sala 1', data: '2025-10-20', horario: '19:00' },
      { sala: 'Sala 2', data: '2025-10-22', horario: '21:30' },
    ],
  },
  {
    id: '2',
    titulo: 'Oppenheimer',
    diretor: 'Christopher Nolan',
    pais: 'EUA',
    duracao: 180,
    nota: 8.5,
    sinopse:
      'A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
    sessoes: [
      { sala: 'Sala IMAX', data: '2025-10-21', horario: '20:00' },
      { sala: 'Sala 3', data: '2025-10-23', horario: '18:00' },
    ],
  },
  {
    id: '3',
    titulo: 'Barbie',
    diretor: 'Greta Gerwig',
    pais: 'EUA',
    duracao: 114,
    nota: 7.2,
    sinopse:
      'Barbie e Ken vivem no colorido e aparentemente perfeito mundo da Barbieland. Mas quando eles têm a chance de ir ao mundo real, logo descobrem as alegrias e os perigos de viver entre os humanos.',
    sessoes: [
      { sala: 'Sala 2', data: '2025-10-20', horario: '15:00' },
      { sala: 'Sala VIP', data: '2025-10-21', horario: '17:00' },
    ],
  },
  {
    id: '4',
    titulo: 'Killers of the Flower Moon',
    diretor: 'Martin Scorsese',
    pais: 'EUA',
    duracao: 206,
    nota: 7.9,
    sinopse:
      'Membros da nação Osage nos Estados Unidos são assassinados sob circunstâncias misteriosas na década de 1920, provocando uma grande investigação do FBI.',
    sessoes: [
      { sala: 'Sala 1', data: '2025-10-22', horario: '19:30' },
      { sala: 'Sala 3', data: '2025-10-24', horario: '20:00' },
    ],
  },
  {
    id: '5',
    titulo: 'Poor Things',
    diretor: 'Yorgos Lanthimos',
    pais: 'Reino Unido',
    duracao: 141,
    nota: 8.1,
    sinopse:
      'A incrível história de Bella Baxter, uma jovem trazida de volta à vida pelo brilhante e pouco ortodoxo cientista Dr. Godwin Baxter.',
    sessoes: [
      { sala: 'Sala VIP', data: '2025-10-20', horario: '21:00' },
      { sala: 'Sala 2', data: '2025-10-23', horario: '19:00' },
    ],
  },
  {
    id: '6',
    titulo: 'The Zone of Interest',
    diretor: 'Jonathan Glazer',
    pais: 'Reino Unido',
    duracao: 105,
    nota: 7.5,
    sinopse:
      'O comandante de Auschwitz, Rudolf Höss, e sua esposa Hedwig se esforçam para construir uma vida de sonho para sua família em uma casa e jardim ao lado do campo.',
    sessoes: [
      { sala: 'Sala 3', data: '2025-10-21', horario: '18:30' },
      { sala: 'Sala 1', data: '2025-10-24', horario: '21:00' },
    ],
  },
]

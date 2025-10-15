export function createEmptyState() {
  const emptyStateHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-20">
      <!-- Cinema Icon/Emoji -->
      <div class="text-8xl mb-6 opacity-50">
        🎬
      </div>

      <!-- Main Message -->
      <h3 class="text-2xl text-text-primary font-semibold mb-3">
        Nenhum filme encontrado
      </h3>

      <!-- Subtitle -->
      <p class="text-text-primary/60 text-center max-w-md mb-4">
        Não há filmes cadastrados no momento ou nenhum filme corresponde aos seus filtros.
      </p>

      <!-- Suggestion Text -->
      <p class="text-sm text-accent-blue/70">
        Tente ajustar os filtros ou aguarde novos filmes serem adicionados
      </p>
    </div>
  `

  return emptyStateHTML
}

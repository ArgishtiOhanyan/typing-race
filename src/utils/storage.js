const RACE_STATE_KEY = 'typing-race-current-state'
const HISTORY_KEY = 'typing-race-history'

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function loadRaceState() {
  return readJson(RACE_STATE_KEY, null)
}

export function saveRaceState(state) {
  try {
    window.localStorage.setItem(RACE_STATE_KEY, JSON.stringify(state))
  } catch {
    // Local storage can be unavailable in private browsing modes.
  }
}

export function loadHistory() {
  const history = readJson(HISTORY_KEY, {})

  return Object.fromEntries(
    Object.entries(history).map(([carId, records]) => [
      carId,
      records.map((record) => ({
        ...record,
        result: record.place <= 3 ? 'win' : 'loss',
      })),
    ]),
  )
}

export function saveRaceResult(leaderboard) {
  const history = loadHistory()
  const finishedAt = new Date().toLocaleString()

  leaderboard.forEach((car, index) => {
    const carHistory = history[car.id] ?? []
    const carResult = index < 3 ? 'win' : 'loss'
    history[car.id] = [
      {
        finishedAt,
        place: index + 1,
        result: carResult,
        wpm: car.wpm,
      },
      ...carHistory,
    ].slice(0, 3)
  })

  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Local storage can be unavailable in private browsing modes.
  }
}

export function clearHistory() {
  try {
    window.localStorage.removeItem(HISTORY_KEY)
  } catch {
    // Local storage can be unavailable in private browsing modes.
  }
}
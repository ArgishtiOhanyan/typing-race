const raceTexts = [
  'The quick brown fox jumps over the lazy dog.',
  'Small steps every day can lead to big results.',
  'Practice makes progress when you stay consistent.',
  'Good code is clear, useful, and easy to change.',
  'Focus on the next character and keep moving forward.',
  'A calm mind and a steady rhythm can turn a difficult typing challenge into a smooth and enjoyable race.',
  'Great software is built one thoughtful decision at a time, with clear ideas, careful testing, and patience.',
  'When a problem feels too large, divide it into smaller pieces and solve each piece with focused attention.',
  'The best way to improve your typing speed is to stay accurate first and let your fingers learn the rhythm.',
  'Every mistake is useful information because it shows exactly where your attention should return and improve.',
  'A well designed interface should feel simple to use while quietly handling all the complicated details underneath.',
  'Creative work becomes easier when you give yourself permission to experiment, make mistakes, and try again.',
  'Strong developers do not memorize every answer; they learn how to ask good questions and investigate clearly.',
  'Keep your eyes on the words ahead, trust your practice, and remember that consistent progress beats rushing.',
  'A successful project grows through small improvements, honest feedback, and the willingness to refine weak ideas.',
  'Modern applications need clean structure, responsive layouts, accessible controls, and thoughtful behavior on every screen.',
  'The finish line is important, but the habits you build while moving toward it are what make the next race easier.',
  'A focused routine helps your hands move with confidence while your mind stays calm and ready for the next word.',
  'Fast typing is not only about speed; it is also about rhythm, accuracy, and recovering quickly from small mistakes.',
  'The clearest solutions usually come from understanding the problem deeply before writing the first line of code.',
  'Good teamwork happens when people communicate early, share useful feedback, and make space for different ideas.',
  'A reliable application should remain pleasant to use when the screen is wide, narrow, bright, or difficult to read.',
  'Learning becomes more rewarding when you measure progress honestly and celebrate improvements that once felt impossible.',
  'The strongest habits are built through repetition, small adjustments, and the patience to continue after a setback.',
  'A thoughtful developer cares about the details that users notice and the invisible details that keep everything stable.',
  'Every race is a chance to learn your rhythm, improve your accuracy, and discover how much faster you can become.',
  'When the path is clear, even a long challenge becomes manageable because every small step has a visible purpose.',
  'Clean design gives important information a clear place while keeping the experience focused and easy to understand.',
  'The best interface is often the one that feels natural immediately and never makes the user stop to understand it.',
  'Progress does not need to be perfect to be meaningful; it only needs to continue in a direction that matters.',
  'Careful preparation creates freedom during the race because your attention can stay on the words instead of the rules.',
  'A good challenge should be demanding enough to stay interesting while still giving you a fair chance to improve.',
  'Small improvements in timing, accuracy, and focus can combine into a result that feels dramatically better over time.',
  'Keep moving forward, correct mistakes with patience, and let every completed sentence build confidence for the next one.',
]

export function getRandomRaceText(recentTexts = []) {
  const recentList = Array.isArray(recentTexts) ? recentTexts : [recentTexts]
  const availableTexts = raceTexts.filter((text) => !recentList.includes(text))
  const candidates = availableTexts.length > 0 ? availableTexts : raceTexts
  const randomIndex = Math.floor(Math.random() * candidates.length)

  return candidates[randomIndex]
}

export const difficultySettings = {
  easy: { label: 'Easy', minWpm: 15, maxWpm: 30 },
  medium: { label: 'Medium', minWpm: 40, maxWpm: 55 },
  hard: { label: 'Hard', minWpm: 70, maxWpm: 82 },
}

export function getRandomBotWpms(difficulty, count) {
  const { minWpm, maxWpm } = difficultySettings[difficulty]

  return Array.from({ length: count }, (_, index) => {
    if (index === 0) {
      return 0
    }

    return Math.round(minWpm + Math.random() * (maxWpm - minWpm))
  })
}

export const cars = [
  { id: 1, emoji: '🚗', name: 'You' },
  { id: 2, emoji: '🚙', name: 'Bot 1' },
  { id: 3, emoji: '🏎️', name: 'Bot 2' },
  { id: 4, emoji: '🚕', name: 'Bot 3' },
  { id: 5, emoji: '🚓', name: 'Bot 4' },
  { id: 6, emoji: '🚗', name: 'Bot 5' },
  { id: 7, emoji: '🚙', name: 'Bot 6' },
]
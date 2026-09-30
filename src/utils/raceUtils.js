export function calculateProgress(typedText, raceText) {
  let correctPrefixLength = 0

  while (
    correctPrefixLength < typedText.length &&
    typedText[correctPrefixLength] === raceText[correctPrefixLength]
  ) {
    correctPrefixLength += 1
  }

  return Math.min((correctPrefixLength / raceText.length) * 100, 100)
}

export function calculateAccuracy(typedText, raceText) {
  if (typedText.length === 0) {
    return 100
  }

  let correctCharacters = 0

  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] === raceText[index]) {
      correctCharacters += 1
    }
  }

  return (correctCharacters / typedText.length) * 100
}

export function calculateWpm(typedText, raceText, elapsedSeconds) {
  if (elapsedSeconds <= 0) {
    return 0
  }

  let correctPrefixLength = 0

  while (
    correctPrefixLength < typedText.length &&
    typedText[correctPrefixLength] === raceText[correctPrefixLength]
  ) {
    correctPrefixLength += 1
  }

  const elapsedMinutes = elapsedSeconds / 60
  return Math.round(correctPrefixLength / 5 / elapsedMinutes)
}
import { useEffect, useRef, useState } from 'react'
import './App.css'

import RaceStats from './components/RaceStats'
import RaceTrack from './components/RaceTrack'
import TrafficLight from './components/TrafficLight'
import HistoryPanel from './components/HistoryPanel'
import TypingArea from './components/TypingArea'
import LoseOverlay from './components/LoseOverlay'
import WinOverlay from './components/WinOverlay'
import {
  cars,
  difficultySettings,
  getRandomRaceText,
  getRandomBotWpms,
} from './data/raceData'
import {
  calculateAccuracy,
  calculateProgress,
  calculateWpm,
} from './utils/raceUtils'
import {
  loadHistory,
  loadRaceState,
  clearHistory,
  saveRaceResult,
  saveRaceState,
} from './utils/storage'

const savedRace = loadRaceState()

function App() {
  const raceDuration = 50
  const [typedText, setTypedText] = useState(savedRace?.typedText ?? '')
  const [time, setTime] = useState(savedRace?.time ?? raceDuration)
  const [countdown, setCountdown] = useState(savedRace?.countdown ?? 0)
  const [raceStarted, setRaceStarted] = useState(savedRace?.raceStarted ?? false)
  const [raceText, setRaceText] = useState(
    savedRace?.raceText ?? getRandomRaceText(),
  )
  const [recentTexts, setRecentTexts] = useState(savedRace?.recentTexts ?? [])
  const [botProgress, setBotProgress] = useState(
    savedRace?.botProgress ?? cars.map(() => 0),
  )
  const [difficulty, setDifficulty] = useState(savedRace?.difficulty ?? 'medium')
  const [botWpms, setBotWpms] = useState(
    savedRace?.botWpms ?? getRandomBotWpms('medium', cars.length),
  )
  const resultRecordedRef = useRef(savedRace?.resultRecorded ?? false)
  const [selectedCarId, setSelectedCarId] = useState(null)
  const [historyVersion, setHistoryVersion] = useState(0)

  const progress = calculateProgress(typedText, raceText)
  const accuracy = calculateAccuracy(typedText, raceText)
  const playerWpm = calculateWpm(typedText, raceText, raceDuration - time)
  const raceFinished = typedText === raceText
  const raceLost =
    !raceFinished && botProgress.slice(1).some((botValue) => botValue >= 100)
  const timeUp =
    raceStarted && countdown === 0 && time === 0 && !raceFinished && !raceLost
  const raceActive =
    raceStarted && countdown === 0 && time > 0 && !raceFinished && !raceLost
  const status = raceFinished
    ? 'Finished'
    : raceLost
      ? 'Lost'
      : timeUp
        ? 'Time up'
        : !raceStarted
          ? 'Ready'
          : countdown > 0
            ? 'Get ready'
            : 'Racing'

  const handleTyping = (event) => {
    setTypedText(event.target.value)
  }

  const resetRace = (nextDifficulty = difficulty) => {
    const nextRecentTexts = [...recentTexts, raceText].slice(-8)

    setTypedText('')
    setTime(raceDuration)
    setCountdown(0)
    setRaceStarted(false)
    setBotProgress(cars.map(() => 0))
    setBotWpms(getRandomBotWpms(nextDifficulty, cars.length))
    setRecentTexts(nextRecentTexts)
    setRaceText(getRandomRaceText(nextRecentTexts))
    resultRecordedRef.current = false
  }

  const startRace = () => {
    if (!raceStarted) {
      setRaceStarted(true)
      setCountdown(4)
    }
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value)
    resetRace(event.target.value)
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistoryVersion((currentVersion) => currentVersion + 1)
  }

  const leaderboard = cars
    .map((car, index) => ({
      ...car,
      progress: index === 0 ? progress : botProgress[index],
      wpm: index === 0 ? playerWpm : botWpms[index],
    }))
    .sort((firstCar, secondCar) => secondCar.progress - firstCar.progress)

  useEffect(() => {
    saveRaceState({
      botProgress,
      botWpms,
      countdown,
      difficulty,
      raceStarted,
      raceText,
      resultRecorded: resultRecordedRef.current,
      recentTexts,
      time,
      typedText,
    })
  }, [botProgress, botWpms, countdown, difficulty, raceStarted, raceText, recentTexts, time, typedText])

  useEffect(() => {
    const finished = raceFinished || raceLost || timeUp

    if (!finished || resultRecordedRef.current) {
      return
    }

    saveRaceResult(leaderboard)
    resultRecordedRef.current = true
  }, [leaderboard, raceFinished, raceLost, timeUp])

  useEffect(() => {
    if (!raceStarted || countdown === 0) {
      return undefined
    }

    const timerId = setInterval(() => {
      setCountdown((currentCountdown) => Math.max(currentCountdown - 1, 0))
    }, 1000)

    return () => clearInterval(timerId)
  }, [countdown, raceStarted])

  useEffect(() => {
    if (
      !raceStarted ||
      countdown !== 0 ||
      time === 0 ||
      raceFinished ||
      raceLost
    ) {
      return undefined
    }

    const timerId = setInterval(() => {
      setTime((currentTime) => Math.max(currentTime - 1, 0))
    }, 1000)

    return () => clearInterval(timerId)
  }, [countdown, raceFinished, raceLost, raceStarted, time])

  return (
    <main className="app">
      <h1>Typing Race</h1>

      <div className="stats-row">
        <RaceStats
          progress={progress}
          accuracy={accuracy}
          time={time}
          wpm={playerWpm}
          status={status}
        />
        <div className="difficulty-picker">
          <label htmlFor="difficulty">Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
          >
            {Object.entries(difficultySettings).map(([value, setting]) => (
              <option key={value} value={value}>
                {setting.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="track-shell">
        <div className="track-controls">
          <button className="reset-button" type="button" onClick={resetRace}>
            New race
          </button>
          <button
            className="start-button"
            type="button"
            disabled={raceStarted}
            onClick={startRace}
          >
            Start
          </button>
          <TrafficLight countdown={raceStarted ? countdown : null} />
        </div>
        <RaceTrack
          key={raceText}
          cars={cars}
          botProgress={botProgress}
          botWpms={botWpms}
          onBotProgressChange={setBotProgress}
          playerProgress={progress}
          playerWpm={playerWpm}
          raceActive={raceActive}
          raceTextLength={raceText.length}
          onCarSelect={setSelectedCarId}
        />
      </div>
      {selectedCarId !== null && (
        <HistoryPanel
          key={historyVersion}
          car={cars.find((car) => car.id === selectedCarId)}
          records={loadHistory()[selectedCarId] ?? []}
          onClose={() => setSelectedCarId(null)}
          onClear={handleClearHistory}
        />
      )}
      <TypingArea
        raceText={raceText}
        typedText={typedText}
        disabled={!raceStarted || countdown > 0 || time === 0 || raceFinished || raceLost}
        onChange={handleTyping}
      />
      {raceFinished && (
        <WinOverlay places={leaderboard.slice(0, 3)} onNewRace={resetRace} />
      )}
      {timeUp && (
        <WinOverlay
          kicker="Time is up"
          title="Top finishers!"
          message="The race has ended. Here are the top three drivers."
          places={leaderboard.slice(0, 3)}
          onNewRace={resetRace}
        />
      )}
      {raceLost && (
        <LoseOverlay places={leaderboard.slice(0, 3)} onNewRace={resetRace} />
      )}
    </main>
  )
}

export default App

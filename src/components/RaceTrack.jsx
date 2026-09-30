import { useEffect } from 'react'
import Car from './Car'

function RaceTrack({
  cars,
  botProgress,
  onBotProgressChange,
  playerProgress,
  raceActive,
  botWpms,
  playerWpm,
  raceTextLength,
  onCarSelect,
}) {
  useEffect(() => {
    if (!raceActive) {
      return undefined
    }

    const timerId = setInterval(() => {
      onBotProgressChange((currentProgress) =>
        currentProgress.map((progress, index) => {
          if (index === 0) {
            return 0
          }

          const charactersPerSecond = (botWpms[index] * 5) / 60
          const progressPerTick =
            (charactersPerSecond * 0.12 * 100) / raceTextLength

          return Math.min(progress + progressPerTick, 100)
        }),
      )
    }, 120)

    return () => clearInterval(timerId)
  }, [botWpms, cars, onBotProgressChange, raceActive, raceTextLength])

  return (
    <section className="race-track">
      {cars.map((car, index) => (
        <div className="lane" key={car.id}>
          <div className="finish-flags" aria-hidden="true">
            <span className="flag flag-blue" />
            <span className="flag flag-yellow" />
            <span className="flag flag-red" />
            <span className="flag flag-green" />
          </div>
          <Car
            emoji={car.emoji}
            name={car.name}
            wpm={index === 0 ? playerWpm : botWpms[index]}
            progress={index === 0 ? playerProgress : botProgress[index]}
            onSelect={() => onCarSelect(car.id)}
          />
        </div>
      ))}
    </section>
  )
}

export default RaceTrack
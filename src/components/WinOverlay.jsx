const confetti = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 12) * 0.12}s`,
  color: ['#38bdf8', '#facc15', '#4ade80', '#fb7185', '#c084fc'][index % 5],
  rotation: `${(index * 43) % 360}deg`,
}))

function WinOverlay({
  kicker = 'Race complete',
  title = 'You won!',
  message = 'Perfect typing. You crossed the finish line first.',
  places,
  onNewRace,
}) {
  return (
    <div className="win-overlay" role="dialog" aria-modal="true">
      <div className="confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            className="confetti-piece"
            key={piece.id}
            style={{
              '--confetti-color': piece.color,
              '--confetti-delay': piece.delay,
              '--confetti-left': piece.left,
              '--confetti-rotation': piece.rotation,
            }}
          />
        ))}
      </div>

      <div className="win-card">
        <p className="win-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className="win-message">{message}</p>

        <ol className="podium">
          {places.map((car, index) => (
            <li className={`place place-${index + 1}`} key={car.id}>
              <span className="place-number">{index + 1}</span>
              <span className="place-car">{car.emoji}</span>
              <span className="place-name">
                {car.name}
                <small>{car.wpm} WPM</small>
              </span>
            </li>
          ))}
        </ol>

        <button className="play-again-button" type="button" onClick={onNewRace}>
          Race again
        </button>
      </div>
    </div>
  )
}

export default WinOverlay
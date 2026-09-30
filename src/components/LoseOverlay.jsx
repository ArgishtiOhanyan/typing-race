function LoseOverlay({ places, onNewRace }) {
  return (
    <div className="lose-overlay" role="dialog" aria-modal="true">
      <div className="lose-card">
        <div className="defeated-car" aria-hidden="true">
          😭🚗
        </div>
        <p className="lose-kicker">Race over</p>
        <h2>You lost!</h2>
        <p className="lose-message">A rival crossed the finish line first.</p>

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
          Try again
        </button>
      </div>
    </div>
  )
}

export default LoseOverlay
function Car({ emoji, name, progress, wpm, onSelect }) {
  return (
    <button
      className="car-wrap"
      type="button"
      style={{ '--progress': `${progress}%` }}
      onClick={onSelect}
      aria-label={`Open ${wpm} WPM driver history`}
    >
      <div className="car">{emoji}</div>
      <span className="car-name">{name}</span>
      <span className="car-wpm">{wpm} WPM</span>
    </button>
  )
}

export default Car
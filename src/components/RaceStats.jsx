function RaceStats({ progress, accuracy, time, wpm, status }) {
  return (
    <section className="stats">
      <div>Progress: {Math.round(progress)}%</div>
      <div>Accuracy: {Math.round(accuracy)}%</div>
      <div>Time: {time}s</div>
      <div>WPM: {wpm}</div>
      <div className="status-stat">{status}</div>
    </section>
  )
}

export default RaceStats
function TrafficLight({ countdown }) {
  if (countdown === null) {
    return null
  }

  const activeLight =
    countdown >= 3 ? 'red' : countdown === 2 ? 'yellow' : 'green'

  return (
    <div className="traffic-light-wrap" aria-label="Race countdown">
      <div className="traffic-light" aria-hidden="true">
        <span className={`light red ${activeLight === 'red' ? 'active' : ''}`} />
        <span
          className={`light yellow ${activeLight === 'yellow' ? 'active' : ''}`}
        />
        <span
          className={`light green ${activeLight === 'green' ? 'active' : ''}`}
        />
      </div>
      <strong className="traffic-countdown">
        {countdown > 0 ? countdown : 'GO!'}
      </strong>
    </div>
  )
}

export default TrafficLight
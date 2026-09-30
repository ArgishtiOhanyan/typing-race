function HistoryPanel({ car, records, onClose, onClear }) {
  return (
    <aside className="history-panel">
      <div className="history-heading">
        <div>
          <p className="history-kicker">Driver history</p>
          <h2>
            {car.emoji} {car.name}
          </h2>
        </div>
        <button className="history-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      {records.length === 0 ? (
        <p className="history-empty">No completed races yet.</p>
      ) : (
        <ol className="history-list">
          {records.map((record, index) => (
            <li key={`${record.finishedAt}-${index}`}>
              <span>Race {index + 1}</span>
              <strong>#{record.place}</strong>
              <span>{record.wpm} WPM</span>
              <strong className={`history-result ${record.result}`}>
                {record.result}
              </strong>
              <small>{record.finishedAt}</small>
            </li>
          ))}
        </ol>
      )}
      {records.length > 0 && (
        <button className="clear-history" type="button" onClick={onClear}>
          Clear all history
        </button>
      )}
    </aside>
  )
}

export default HistoryPanel
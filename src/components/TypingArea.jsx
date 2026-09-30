function TypingArea({ raceText, typedText, disabled, onChange }) {
  return (
    <section className="typing-area">
      <p className="typing-text">
        {raceText.split('').map((character, index) => {
          const typedCharacter = typedText[index]
          const characterClass =
            typedCharacter === undefined
              ? ''
              : typedCharacter === character
                ? 'correct'
                : 'incorrect'

          return (
            <span className={characterClass} key={`${character}-${index}`}>
              {character}
            </span>
          )
        })}
      </p>
      <input
        type="text"
        value={typedText}
        disabled={disabled}
        maxLength={raceText.length}
        onChange={onChange}
        placeholder="Start typing..."
      />
    </section>
  )
}

export default TypingArea
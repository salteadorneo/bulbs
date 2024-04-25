import { useState } from 'preact/hooks'
import { Game } from './components/Game'
import { LEVEL } from './constants'
import { getLevel } from './utils'
import './App.css'

export default function App() {
  const getMaxLevel = getLevel()

  const [currentLevel, setCurrentLevel] = useState(-1)

  return (
    <main>
      {currentLevel === -1 && (
        <>
          <h1>Too high</h1>
          <section className="levels">
            {LEVEL.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentLevel(index)}
                className="button level"
                disabled={index > getMaxLevel}
              >
                {index + 1}
              </button>
            ))}
          </section>
        </>
      )}
      {currentLevel >= 0 && (
        <Game
          currentLevel={currentLevel}
          setCurrentLevel={() => setCurrentLevel(currentLevel + 1)}
          onClose={() => setCurrentLevel(-1)}
        />
      )}
    </main>
  )
}





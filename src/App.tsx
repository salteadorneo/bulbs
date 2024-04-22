import { useState } from 'preact/hooks'
import { Light } from './components/Light'
import { Game } from './components/Game'
import { LEVEL } from './constants'
import { getLevel } from './services/storage'
import './App.css'

export interface Light {
  id: string
  power: boolean
  broken: boolean
  freezed?: boolean
}

export default function App() {
  const getMaxLevel = getLevel()

  const [currentLevel, setCurrentLevel] = useState(-1)

  return (
    <main>
      {currentLevel === -1 && (
        <section className="levels">
          {LEVEL.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentLevel(index)}
              className="level"
              disabled={index > getMaxLevel}
            >
              {index + 1}
            </button>
          ))}
        </section>
      )}
      {currentLevel >= 0 && (
        <>
          {currentLevel + 1}/{LEVEL.length}
          <Game
            currentLevel={currentLevel}
            setCurrentLevel={() => setCurrentLevel(currentLevel + 1)}
            onClose={() => setCurrentLevel(-1)}
          />
        </>
      )}
    </main>
  )
}





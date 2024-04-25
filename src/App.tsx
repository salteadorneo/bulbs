import { useEffect, useState } from 'preact/hooks'
import { Game } from './components/Game'
import { LEVEL } from './constants'
import { getLevel } from './utils'
import './App.css'
import { Bulb } from './components/Bulb'

export default function App() {
  const getMaxLevel = getLevel()

  const [currentLevel, setCurrentLevel] = useState(-1)

  const [power, setPower] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setPower(true)
    }, 1000)
  }, [])

  return (
    <main>
      {currentLevel === -1 && (
        <>
          <Bulb
            light={{
              id: "-1",
              power,
              hideTemperature: true,
            }}
            onClick={() => { }}
          />
          <h1>Bulbs</h1>
          <p>Levels</p>
          <section className={`levels ${power && "show"}`}>
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





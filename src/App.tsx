import { useState } from 'preact/hooks'
import { Light } from './components/Light'
import { getNewLight } from './utils'
import { Game } from './components/Game'
import './App.css'

export interface Light {
  id: string
  power: boolean
  broken: boolean
  freezed?: boolean
}

const LEVEL = [
  [
    getNewLight({}),
    getNewLight({})
  ],
  [
    getNewLight({}),
    getNewLight({}),
    getNewLight({})
  ],
  [
    getNewLight({ broken: true }),
    getNewLight({}),
    getNewLight({})
  ],
  [
    getNewLight({}),
    getNewLight({}),
    getNewLight({}),
    getNewLight({})
  ],
  [
    getNewLight({}),
    getNewLight({}),
    getNewLight({}),
    getNewLight({}),
    getNewLight({})
  ],
  [
    getNewLight({ broken: true }),
    getNewLight({}),
    getNewLight({}),
    getNewLight({}),
    getNewLight({})
  ]
]

export default function App() {
  const [level, setLevel] = useState<Light[] | null>(null)

  const [currentLevel, setCurrentLevel] = useState(0)

  return (
    <main>
      {!level && (
        <>
          <section className="levels">
            {LEVEL.map((level, index) => (
              <button
                key={index}
                onClick={() => setLevel(level)}
                className="level"
                disabled={index > currentLevel}
              >
                {index + 1}
              </button>
            ))}
          </section>
        </>
      )}
      {level && (
        <Game
          level={level}
          onReset={() => setLevel(null)}
          onNext={() => {
            setCurrentLevel(currentLevel + 1)
            setLevel(LEVEL[currentLevel + 1])
          }}
        />
      )}
    </main>
  )
}





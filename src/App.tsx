import { Light } from './components/Light'
import { getNewLight } from './utils'
import { Game } from './components/Game'
import './App.css'

export interface Light {
  id: string
  power: boolean
  broken: boolean
  freezed: boolean
}

export default function App() {
  const lights = [
    getNewLight({}),
    getNewLight({}),
    getNewLight({ broken: true }),
    getNewLight({}),
  ]

  const switches = lights.map(l => l.id)
  do {
    switches.sort(() => Math.random() - 0.5)
  } while (switches.join('') === lights.map(l => l.id).join(''))

  return (
    <main>
      <Game
        lights={lights}
        switches={switches}
      />
    </main>
  )
}





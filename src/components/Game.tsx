import { useEffect, useMemo, useState } from "react"
import { Bulb } from "./Bulb"
import { Switch } from "./Switch"
import { LEVEL } from "../constants"
import { getLevel, saveLevel } from "../utils"

interface Props {
    currentLevel: number
    setCurrentLevel: () => void
    onClose: () => void
}

export function Game({ currentLevel, setCurrentLevel, onClose }: Props) {
    const switches = useMemo(() => {
        const level = LEVEL[currentLevel]
        let switches: string[] = []
        do {
            switches = level.map(l => l.id)
            switches.sort(() => Math.random() - 0.5)
        } while (switches.join('') === level.map(l => l.id).join(''))
        return switches
    }, [currentLevel])

    const [lights, setLights] = useState(LEVEL[currentLevel])

    useEffect(() => {
        init()
    }, [currentLevel])

    function init() {
        setGoUp(false)
        setChecked([])
        setLights(LEVEL[currentLevel])
    }

    const [checked, setChecked] = useState<string[]>([])
    const expected = switches

    const [goUp, setGoUp] = useState(false)

    const [result, setResult] = useState("")

    useEffect(() => {
        if (checked.length === 0) {
            setResult("")
            return
        }
        if (checked.length === expected.length) {
            const isWin = checked.join('') === expected.join('')
            if (isWin) {
                setResult('win')

                const maxLevel = getLevel()
                saveLevel(Math.max(maxLevel, currentLevel + 1))
            } else {
                setResult('lose')
            }
        }
    }, [checked, expected])

    function checkLight(id: string) {
        if (checked.includes(id)) {
            return
        }
        setChecked(checked => [...checked, id])
    }

    function handleNext() {
        setLights(lights => lights.map(l => ({ ...l, freezed: true })))
        setGoUp(true)
    }

    return (
        <>
            <p className="currentLevel">{currentLevel + 1}</p>

            <div className={`lights ${goUp && 'resolve'}`}>
                {lights.map((light) => (
                    <Bulb
                        key={light.id}
                        light={light}
                        onClick={() => checkLight(light.id)}
                    />
                ))}
            </div>
            <div className={`switches ${goUp && 'resolve'}`}>
                <button onClick={handleNext} className="look-up">
                    ↑ Look up! ↑
                </button>
                <div>
                    {switches.map((id, index) => (
                        <Switch
                            key={id}
                            index={index}
                            power={lights.find(l => l.id === id)?.power || false}
                            onChange={value => {
                                setLights(lights => lights.map(l => {
                                    if (l.id === id) {
                                        return { ...l, power: value }
                                    }
                                    return l
                                }))
                            }}
                        />
                    ))}
                </div>
            </div>

            {result != "" && (
                <div className="result">
                    {result === 'win' ? 'You win!' : 'You lose!'}
                    <div className="buttons">
                        <button onClick={init} className="button">
                            ⟳
                        </button>
                        <button
                            onClick={setCurrentLevel}
                            className="button"
                            disabled={result !== 'win'}
                        >
                            ↪
                        </button>
                    </div>
                </div>
            )}

            <button onClick={onClose} className="button backtomenu">
                Back to menu
            </button>
        </>
    )
}
import { useEffect, useMemo, useState } from "react"
import { Bulb } from "./Bulb"
import { Switch } from "./Switch"
import { LEVEL } from "../constants"
import { getLevel, saveLevel } from "../utils"

interface Props {
    currentLevel: number
    setCurrentLevel: (currentLevel: number) => void
}

export function Game({ currentLevel, setCurrentLevel, }: Props) {
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
        setLights(LEVEL[currentLevel].map(l => ({ ...l, power: false, freezed: false, temperature: 0 })))
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
            <p className="currentLevel">Level {currentLevel + 1}</p>

            <div className={`lights ${goUp && 'resolve'}`}>
                <div>
                    {lights.map((light) => (
                        <Bulb
                            key={light.id}
                            light={light}
                            index={
                                checked.indexOf(light.id) + 1
                            }
                            onClick={() => {
                                checkLight(light.id)
                            }}
                        />
                    ))}
                </div>
                {checked.length < expected.length && (
                    <p className="question">
                        Which bulb receives power from <strong>switch {checked.length + 1}</strong>?
                    </p>
                )}
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
                <section>
                    {currentLevel === 0 && (
                        <p className="explain">
                            Turn on a switch. Look above and guess the order. You only get one try.
                        </p>
                    )}
                    {currentLevel === 1 && (
                        <p className="explain">
                            Nothing works forever.
                        </p>
                    )}
                    {currentLevel === 2 && (
                        <p className="explain">
                            Okay, so far it was easy. The bulbs will heat up. Timing is the key.
                        </p>
                    )}
                </section>
            </div>

            {result != "" && (
                <div className="result">
                    {result === 'win' ? 'You win!' : 'You lose!'}
                    <div className="buttons">
                        <button onClick={init} className="button">
                            <span>⟳</span> Retry
                        </button>
                        <button
                            onClick={() => setCurrentLevel(currentLevel + 1)}
                            className="button"
                            disabled={result !== 'win'}
                        >
                            <span>↪</span> Next
                        </button>
                    </div>
                </div>
            )}

            <button onClick={() => setCurrentLevel(-1)} className="button backtomenu">
                Back to menu
            </button>
        </>
    )
}
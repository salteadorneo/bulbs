import { useEffect, useMemo, useState } from "react"
import { Light } from "./Light"
import { Switch } from "./Switch"
import { IconNext, IconRetry } from "./Icons"
import { LEVEL } from "../constants"
import { getLevel, saveLevel } from "../services/storage"

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
        setShowLights(false)
        setResult("")
        setChecked([])
        setLights(LEVEL[currentLevel])
    }

    const [checked, setChecked] = useState<string[]>([])
    const expected = switches

    const [showLights, setShowLights] = useState(false)

    const [result, setResult] = useState("")

    useEffect(() => {
        if (checked.length === 0) {
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
        setShowLights(true)
    }

    return (
        <>
            <div className={`flex ${showLights && 'hidden'}`}>
                {switches.map((id, index) => (
                    <>
                        {index + 1}
                        <Switch
                            key={id}
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
                    </>
                ))}
            </div>
            <div className={`flex ${!showLights && 'hidden'}`}>
                {lights.map((light) => (
                    <Light
                        key={light.id}
                        light={light}
                        onClick={() => checkLight(light.id)}
                    />
                ))}
            </div>
            {!showLights && (
                <button onClick={handleNext}>
                    Show lights
                </button>
            )}
            {result != "" && (
                <>
                    {result === 'win' ? 'You win!' : 'You lose!'}
                    <div>
                        <button onClick={init}>
                            <IconRetry />
                        </button>
                        <button
                            onClick={setCurrentLevel}
                            disabled={result !== 'win'}
                        >
                            <IconNext />
                        </button>
                    </div>
                    <button onClick={onClose}>
                        Back to menu
                    </button>
                </>
            )}
        </>
    )
}
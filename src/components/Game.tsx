import { useEffect, useMemo, useState } from "react"
import { Light as LightType } from "../App"
import { Light } from "./Light"
import { Switch } from "./Switch"

interface Props {
    level: LightType[]
    onReset: () => void
    onNext: () => void
}

export function Game({ level, onReset, onNext }: Props) {
    const switches = useMemo(() => {
        let switches: string[] = []
        do {
            switches = level.map(l => l.id)
            switches.sort(() => Math.random() - 0.5)
        } while (switches.join('') === level.map(l => l.id).join(''))
        return switches
    }, [level])

    const [lights, setLights] = useState(level)

    useEffect(() => {
        console.log('level changed')
        setShowLights(false)
        setResult("")
        setChecked([])
        setLights(level)
    }, [level])

    const [checked, setChecked] = useState<string[]>([])
    const expected = switches

    const [showLights, setShowLights] = useState(false)

    const [result, setResult] = useState("")

    useEffect(() => {
        if (checked.length === expected.length) {
            const isWin = checked.join('') === expected.join('')
            if (isWin) {
                setResult('win')
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
        <main>
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
                    <button onClick={onReset}>
                        Reset
                    </button>
                    <button
                        onClick={onNext}
                        disabled={result !== 'win'}
                    >
                        &gt;&gt;
                    </button>
                </>
            )}
        </main>
    )
}
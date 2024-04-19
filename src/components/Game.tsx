import { useEffect, useMemo, useState } from "react"
import { Light as LightType } from "../App"
import { Light } from "./Light"
import { Switch } from "./Switch"

interface Props {
    level: LightType[]
    onReset: () => void
}

export function Game({ level, onReset }: Props) {
    const switches = useMemo(() => {
        let switches: string[] = []
        do {
            switches = level.map(l => l.id)
            switches.sort(() => Math.random() - 0.5)
        } while (switches.join('') === level.map(l => l.id).join(''))
        return switches
    }, [level])

    const [lights, setLights] = useState(level)

    const [checked, setChecked] = useState<string[]>([])
    const expected = switches

    const [showLights, setShowLights] = useState(false)

    useEffect(() => {
        if (checked.length === expected.length) {
            const isWin = checked.join('') === expected.join('')
            if (isWin) {
                alert('¡Has ganado!')
            } else {
                alert('¡Has perdido!')
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
            {showLights && (
                <button onClick={onReset}>
                    Reset
                </button>
            )}
        </main>
    )
}
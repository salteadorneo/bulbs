import { useEffect, useState } from "react"
import { Light as LightType } from "../App"
import { Light } from "./Light"
import { Switch } from "./Switch"

interface Props {
    lights: LightType[]
    switches: string[]
}

export function Game({ lights: init, switches }: Props) {
    const [lights, setLights] = useState(init)

    const [checked, setChecked] = useState<string[]>([])
    const expected = switches

    const [showLights, setShowLights] = useState(false)

    useEffect(() => {
        if (checked.length === expected.length) {
            console.log(checked, expected)
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
                {switches.map((id) => (
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
            <button onClick={handleNext}>
                Show lights
            </button>
        </main>
    )
}
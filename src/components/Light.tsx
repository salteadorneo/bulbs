import { useEffect, useState } from "react"
import { Light as LightType } from "../App"
import { IconLight, IconLightOff } from "./Icons"

interface Props {
    light: LightType
    onClick: () => void
}

export function Light({ light, onClick }: Props) {
    const [isOn, setIsOn] = useState(light.power)
    const [temperature, setTemperature] = useState(0)

    useEffect(() => {
        if (light.broken) {
            return
        }
        setIsOn(light.power)
    }, [light])

    useEffect(() => {
        if (isOn && temperature < 40) {
            const interval = setInterval(() => {
                if (light.freezed) {
                    return
                }
                setTemperature(t => t + 1)
            }, 1000)
            return () => clearInterval(interval)
        } else if (!isOn && temperature > 0) {
            const interval = setInterval(() => {
                if (light.freezed) {
                    return
                }
                setTemperature(t => t - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isOn, light.freezed, temperature])

    return (
        <div className='light' title={light.id} onClick={onClick}>
            {light.broken && '💥'}
            {isOn ? <IconLight /> : <IconLightOff />} ({temperature}°C)
        </div>
    )
}
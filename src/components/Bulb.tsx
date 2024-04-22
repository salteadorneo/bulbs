import { useEffect, useState } from "react"
import { Light } from "../types"

interface Props {
    light: Light
    onClick: () => void
}

export function Bulb({ light, onClick }: Props) {
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
        <div className="light" onClick={onClick}>
            <div className="wire"></div>
            <div className={`bulb ${isOn && "on"} ${light.broken && "broken"}`}>
                <span></span>
                <span></span>
                {light.broken && <span></span>}
            </div>
            {!light.hideTemperature && (
                <div className="temperature">{temperature}°C</div>
            )}
        </div>
    )
}
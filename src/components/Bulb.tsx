import { useEffect, useState } from "react"
import { Light } from "../types"

interface Props {
    light: Light
    index?: number
    onClick: () => void
}

export function Bulb({ light, index, onClick }: Props) {
    const [isOn, setIsOn] = useState(light.power)
    const [temperature, setTemperature] = useState(light.temperature || 0)

    useEffect(() => {
        if (index === 0) {
            setTemperature(0)
        }
    }, [index])

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
            }, 1500)
            return () => clearInterval(interval)
        } else if (!isOn && temperature > 0) {
            const interval = setInterval(() => {
                if (light.freezed) {
                    return
                }
                setTemperature(t => t - 1)
            }, 1500)
            return () => clearInterval(interval)
        }
    }, [isOn, light.freezed, temperature])

    return (
        <div className="light" onClick={onClick}>
            <div className="wire"></div>
            {index != 0 && <span className="index">{index}</span>}
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
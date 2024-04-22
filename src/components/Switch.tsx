interface Props {
    power: boolean
    index: number
    onChange: (value: boolean) => void
}

export function Switch({ power, index, onChange }: Props) {
    return (
        <div className={`switch ${power && 'on'}`} onClick={() => onChange(!power)}>
            <p className="index">{index + 1}</p>
            <div className="btn"></div>
        </div>
    )
}
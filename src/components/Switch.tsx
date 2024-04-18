interface SwitchProps {
    power: boolean
    onChange: (value: boolean) => void
}

export function Switch({ power, onChange }: SwitchProps) {
    return (
        <div className='switch' onClick={() => onChange(!power)}>
            {power ? '🟢' : '🔴'}
        </div>
    )
}
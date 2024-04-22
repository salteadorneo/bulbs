interface Props {
    power: boolean
    onChange: (value: boolean) => void
}

export function Switch({ power, onChange }: Props) {
    return (
        <div className='switch' onClick={() => onChange(!power)}>
            {power ? '🟢' : '🔴'}
        </div>
    )
}
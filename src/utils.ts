import { Light } from "./App"

type LightProps = {
  power?: boolean
  broken?: boolean
}

export function getNewLight({ power = false, broken = false }: LightProps): Light {
  return {
    id: crypto.randomUUID(),
    power,
    broken,
  }
}
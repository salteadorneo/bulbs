import { Light } from "./types"

type Props = {
  power?: boolean
  broken?: boolean
}

export function getNewLight({ power = false, broken = false }: Props): Light {
  return {
    id: crypto.randomUUID(),
    power,
    broken,
  }
}
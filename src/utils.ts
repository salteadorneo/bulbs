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

export const saveLevel = (level: number) => {
  localStorage.setItem('level', level.toString());
}

export const getLevel = () => {
  const level = localStorage.getItem('level');
  return level ? parseInt(level, 10) : 0;
}
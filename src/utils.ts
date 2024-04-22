import { Light } from "./types"

export function getNewLight(props: Partial<Light>) {
  return {
    id: crypto.randomUUID(),
    ...props,
  }
}

export const saveLevel = (level: number) => {
  localStorage.setItem('level', level.toString());
}

export const getLevel = () => {
  const level = localStorage.getItem('level');
  return level ? parseInt(level, 10) : 0;
}
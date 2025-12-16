import { useEffect } from 'react'

export function usePlayTimer(active: boolean, onTick: () => void, speed: number) {
  useEffect(() => {
    if (!active) return
    const id = setInterval(onTick, speed)
    return () => clearInterval(id)
  }, [active, onTick, speed])
}

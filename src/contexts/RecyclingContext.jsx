import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculatePoints, getTierByWeight } from '../utils/rewardEngine'
import { RecyclingContext } from './recycling-context'

export const RecyclingProvider = ({ children }) => {
  const [entries, setEntries] = useLocalStorage('recycling_entries', [])
  const [isDarkMode, setIsDarkMode] = useLocalStorage('recycling_dark_mode', false)

  const addEntry = (entry) => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: entry.type,
        weight: Number(entry.weight),
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const addBulkEntries = (uploadedEntries) => {
    const normalized = uploadedEntries
      .map((item) => ({
        id: crypto.randomUUID(),
        type: item.type,
        weight: Number(item.weight),
        createdAt: new Date().toISOString(),
      }))
      .filter((item) => item.type && Number.isFinite(item.weight) && item.weight > 0)

    if (normalized.length) {
      setEntries((prev) => [...prev, ...normalized])
    }

    return normalized.length
  }

  const totalWeight = useMemo(
    () => entries.reduce((sum, item) => sum + Number(item.weight || 0), 0),
    [entries],
  )

  const tier = useMemo(() => getTierByWeight(totalWeight), [totalWeight])
  const points = useMemo(() => calculatePoints(totalWeight), [totalWeight])

  const clearEntries = () => setEntries([])

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  const value = {
    entries,
    totalWeight,
    tier,
    points,
    isDarkMode,
    addEntry,
    addBulkEntries,
    clearEntries,
    toggleTheme,
  }

  return <RecyclingContext.Provider value={value}>{children}</RecyclingContext.Provider>
}

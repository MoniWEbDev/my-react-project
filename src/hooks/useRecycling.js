import { useContext } from 'react'
import { RecyclingContext } from '../contexts/recycling-context'

export const useRecycling = () => {
  const context = useContext(RecyclingContext)

  if (!context) {
    throw new Error('useRecycling must be used within a RecyclingProvider')
  }

  return context
}

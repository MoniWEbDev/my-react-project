import { useContext } from 'react'
import { LearningContext } from '../contexts/learning-context'

export const useLearning = () => {
  const context = useContext(LearningContext)

  if (!context) {
    throw new Error('useLearning must be used within LearningProvider')
  }

  return context
}

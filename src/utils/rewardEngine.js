const TIER_META = {
  low: { min: 1, max: 5, label: 'Green Starter', pointsPerKg: 35, level: 1 },
  medium: { min: 5, max: 10, label: 'Eco Explorer', pointsPerKg: 50, level: 2 },
  premium: { min: 10, max: Infinity, label: 'Planet Guardian', pointsPerKg: 70, level: 3 },
}

export const getTierByWeight = (weight) => {
  if (weight >= TIER_META.premium.min) return 'premium'
  if (weight >= TIER_META.medium.min) return 'medium'
  if (weight >= TIER_META.low.min) return 'low'
  return 'none'
}

export const getTierMeta = (tier) =>
  TIER_META[tier] ?? { min: 0, max: 0, label: 'Start Recycling', pointsPerKg: 0, level: 0 }

export const calculatePoints = (totalWeight) => {
  const tier = getTierByWeight(totalWeight)
  const pointsPerKg = getTierMeta(tier).pointsPerKg
  return Math.floor(totalWeight * pointsPerKg)
}

export const nextLevelProgress = (totalWeight) => {
  if (totalWeight >= 10) return { progress: 100, target: 'Top tier unlocked' }
  if (totalWeight >= 5) {
    const progress = Math.min(100, ((totalWeight - 5) / 5) * 100)
    return { progress, target: 'Recycle 10 kg to unlock premium gifts' }
  }

  const progress = Math.min(100, (totalWeight / 5) * 100)
  return { progress, target: 'Recycle 5 kg to unlock medium gifts' }
}

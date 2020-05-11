export type RateLimit = {
  limit: number
  remaining: number
  cost: number
  resetAt: string
}

export const logRateLimit = (response: { rateLimit: RateLimit }): void => {
  console.log(
    `Rate limit: ${response.rateLimit.remaining}/${response.rateLimit.limit}. Cost: ${response.rateLimit.cost}. Reset at: ${response.rateLimit.resetAt}.`
  )
}

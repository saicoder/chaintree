export function seedFromString(seed: string) {
  return seed.split('').reduce((ac, t) => (t.charCodeAt(0) + ac) % Number.MAX_SAFE_INTEGER, 0)
}

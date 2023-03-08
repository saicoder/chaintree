export const resolveUrl = (url: string) => {
  if (url.startsWith('https://')) return url

  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://w3s.link/ipfs/')
  }

  throw new Error('Invalid URL')
}

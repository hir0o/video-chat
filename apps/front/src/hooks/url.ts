// eslint-disable-next-line
const serverDomain = process.env.NEXT_PUBLIC_SERVER_DOMAIN || 'localhost:3000'
export const httpUrl = `http://${serverDomain}`

export const wsUrl = `ws://${serverDomain}`

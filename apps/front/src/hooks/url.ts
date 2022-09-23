const serverDomain = process.env.NEXT_PUBLIC_SERVER_DOMAIN || 'localhost:3000'
export const httpUrl = 'https://' + serverDomain

export const wsUrl = 'wss://' + serverDomain

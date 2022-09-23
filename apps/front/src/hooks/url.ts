const serverDomain = process.env.SERVER_URL || 'localhost:3000'
export const httpUrl = 'http://' + serverDomain

export const wsUrl = 'ws://' + serverDomain

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '815889612525-indtblf9fpfmq19arcc8ib4803tgqbif.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
}
export default NextAuth(authOptions)

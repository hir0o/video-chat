import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '163286298155-lirimgtsts51onhfc1bmokd2f4dm2dbk.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
}
export default NextAuth(authOptions)

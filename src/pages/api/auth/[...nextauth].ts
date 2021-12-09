import NextAuth from "next-auth"
import { query as q } from "faunadb"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/faunadb"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
     
    }),
], 

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      try {
      const {email} = user
      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
                )
          )
        ),
        q.Create(
          q.Collection('users'),{data:{email}}
        ),
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(user.email)
          )
        )
      )
      )      
        return true
      } catch (error) {
        return false
      }
      
    }
  }   
})

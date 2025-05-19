import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from "next-auth/react";

import User from "@/models/User";
import { connectToDb } from "@/utils/database";

interface GoogleProfile {
    email: string;
    name: string;
    picture: string;
    given_name?: string;
    family_name?: string;
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session, token, user}){
           const sessionUser = await User.findOne({
            email: session.user?.email
           })
             if(sessionUser){
           session.user.id = sessionUser._id.toString()
             }
           return session
        },
        async signIn({profile} : {
            profile: GoogleProfile
        }){
          try {
            await connectToDb();
            const userExists = await User.findOne({
                email: profile?.email
            })

            if(!userExists){
                User.create({
                    email: profile?.email,
                    username: profile?.name?.replace(" ", "").toLowerCase(),
                    image: profile?.picture
                })
            }
            return true
          } catch (error) {
            console.log(error)
          }
        }
    }
})

export {handler as GET, handler as POST}
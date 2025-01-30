import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db/prisma'
import { Adapter } from 'next-auth/adapters'
import authConfig from "./auth.config"
import { randomBytes } from 'crypto'

const maxAge = 30 * 24 * 60 * 60; // 30 days
const updateAge = 24 * 60 * 60 // 1 day

export async function createSession (userId: string) {
    // expiration age
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    // Generate a custome session token
    const sessionToken = randomBytes(32).toString('hex')
    // Store it in the database
    return await prisma.session.create({
        data: {
                    userId,
                    expires: expiresAt,
                    sessionToken
        }
    })
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: { 
        maxAge: maxAge, // 30 days
        updateAge: updateAge, // 1 day
        strategy: "database"
    },
    ...authConfig,
    pages: {
        signIn: '/signin',
        error: '/error',
    },
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },        
    debug: false,
})

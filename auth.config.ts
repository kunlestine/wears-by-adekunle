import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from "next-auth"
import prisma from '@/lib/db/prisma'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import { env } from '@/lib/env'
import { signInSchema } from './lib/definitions'
import bcrypt from 'bcryptjs';

const providers: Provider[] = [
    Credentials({
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        authorize: async credentials => {
            if (!credentials?.email || !credentials?.password) {
                throw new Error('Email and password are required')
            }

            const { email, password } =
                await signInSchema.parseAsync(credentials)

            // Verify user credentials
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            })
            if (!user || !user?.hashedPassword) {
                throw new Error('Invalid credentials')
            }

            const isCorrectPassword = await bcrypt.compare(
                password,
                user.hashedPassword,
            )
            if (!isCorrectPassword) {
                throw new Error('Invalid Credentilas')
            }
            return user
        },
    }),
    Google({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
]

export const providerMap = providers
    .map(provider => {
        if (typeof provider === 'function') {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter(provider => provider.id !== 'credentials') 



// Notice this is only an object, not a full Auth.js instance
export default {
  providers
} satisfies NextAuthConfig
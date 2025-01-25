import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db/prisma'
import { Adapter } from 'next-auth/adapters'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import { env } from '@/lib/env'
import { signInSchema } from './lib/definitions'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcryptjs')

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

            const isCorrectPassword = await bcrypt.compareSync(
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
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
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

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    providers,
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

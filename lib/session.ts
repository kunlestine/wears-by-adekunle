import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers'
import prisma from './db/prisma'
import { randomBytes } from 'crypto';

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

// Creating session
export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    // Generate a unique session token
    const sessionToken = randomBytes(32).toString('hex');

    const dbSession = await prisma.session.create({
        data: {
            userId,
            expires: expiresAt,
            sessionToken
        }  
    })
     
    // Encrypt the session data
    const session = await encrypt({ userId: dbSession.userId, expires: dbSession.expires });
  
    // Get the cookie store
    const cookieStore = await cookies()
    
    // Set the session token in a cookie
        cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
        })
    }

// Updating session
export async function updateSession() {
const session = (await cookies()).get('session')?.value
const payload = await decrypt(session)

if (!session || !payload) {
    return null
}

const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

const cookieStore = await cookies()
cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
})
}

// Deleting session
export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
  }
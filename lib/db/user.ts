import { cookies } from 'next/headers'
import prisma from './prisma'
import { SignupFormSchema } from '@/lib/definitions'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt')

export async function createUser(formData: FormData) {
    try {
        // Validate form fields
        const validatedFields = SignupFormSchema.parse({
            name: formData.get('name')?.toString() || '',
            email: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
        })

        // 2. Prepare data for insertion into database
        const { name, email, password } = validatedFields
        // e.g. Hash the user's password before storing it
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        })

        // Set a secure cookie for the user's ID
        const cookieStore = await cookies()
        cookieStore.set('localUserId', newUser.id, {
            httpOnly: true,
            secure: true,
        })
        return newUser
    } catch (error) {
        console.error('Error creating user:', error)
        throw new Error('Failed to create user')
    }
}

export async function getUser(email: string, password: string) {
    try {
        // Fetch the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new Error('User not found')
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword,
        )
        if (!isPasswordValid) {
            throw new Error('Invalid credentials')
        }

        return user
    } catch (error) {
        console.error('Error fetching user:', error)
        throw new Error('Failed to fetch user')
    }
}

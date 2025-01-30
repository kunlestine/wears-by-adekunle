'use server';

import { createSession } from '@/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'
import { SignupFormSchema } from '@/lib/definitions'
import bcrypt from 'bcryptjs';

export async function signUp(formData: FormData) {
    try {
        // Validate form fields
        const validatedFields = SignupFormSchema.parse({
            name: formData.get('name')?.toString() || '',
            email: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
        })

        // Extract validated fields
        const { name, email, password } = validatedFields

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        })

        // Create a session for the user
        await createSession(newUser.id)

        // Redirect to the homepage after successful sign-up
        redirect('/')
    } catch (error) {
        console.error('Error creating user:', error)
        throw new Error('Failed to create user')
    }
}
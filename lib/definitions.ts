import { DateTime } from 'next-auth/providers/kakao'
import { z, object, string } from 'zod'

export const SignupFormSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .trim(),
        email: z
            .string()
            .email({ message: 'Please enter a valid email.' })
            .trim(),
        password: z
            .string()
            .min(8, { message: 'Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.',
            })
            .trim(),
    })
    .strict() // Ensures no unexpected fields are included

export const signInSchema = object({
    email: string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: string({ required_error: 'Password is required' })
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})

export type FormState =
    | {
          errors?: {
              name?: string[]
              email?: string[]
              password?: string[]
          }
          message?: string
      }
    | undefined

export type SessionPayload = 
    {
        aud?: string | string[]
        iss?: string
        iat?: number
        exp?: number
        jti?: string
        userId: string
        expires: Date
    }
import zod from 'zod'

const envSchema = zod.object({
    DATABASE_URL: zod.string().nonempty(),
    AUTH_GOOGLE_SECRET: zod.string().nonempty(),
    AUTH_GOOGLE_ID: zod.string().nonempty(),
    NEXTAUTH_URL: zod.string().nonempty(),
    AUTH_SECRET: zod.string().nonempty(),
})

export const env = envSchema.parse(process.env)

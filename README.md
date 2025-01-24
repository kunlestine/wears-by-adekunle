# Step 1
create the next project using the:
`npx create-next-app@latest`
followed by choosing the option that are needed to create the project.

# Step 2 install the necessary dependencies
# Dependencies
- NextAuth
- DaisyUI
- zod
- Prisma
- MongoDB

# create a mongoDB database
create a free mongoDB account.

# install the Prisma adapter for mongoDB
    """ 
        npm install @prisma/client @auth/prisma-adapter
        npm install prisma --save-dev
    """
## set the enviroment variable
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
## configure the Prisma ORM
    """
        import { PrismaClient } from '@prisma/client'

        const prismaClientSingleton = () => {
            return new PrismaClient()
        }

        declare const globalThis: {
            prismaGlobal: ReturnType<typeof prismaClientSingleton>
        } & typeof global

        const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

        export default prisma

        if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
    """

## create an auth.ts file at the root of the folder
    """
        import NextAuth from "next-auth"
        import { PrismaAdapter } from "@auth/prisma-adapter"
        import { prisma } from "@/prisma"
        
        export const { handlers, auth, signIn, signOut } = NextAuth({
        adapter: PrismaAdapter(prisma),
        providers: [],
        })
    """
# Apply Schema
create a schema file ay prisma/schema.prisma with the MongoDB model.

"""
    datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
 
generator client {
  provider = "prisma-client-js"
}
 
model User {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@unique([provider, providerAccountId])
}
 
model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String
  expires    DateTime
 
  @@unique([identifier, token])
}
 
// Optional for WebAuthn support
model Authenticator {
  credentialID         String  @id @map("_id")
  userId               String  @db.ObjectId
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@unique([userId, credentialID])
}


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

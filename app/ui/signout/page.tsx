import { signOut } from '@/auth'
import React from 'react'

export default function SignOutPage({children}: {children: React.ReactNode}) {
    return (
        <div>
            <form
                action={async formData => {
                    'use server'
                    await signOut()
                }}
            >
                <p>{children}</p>
                <button type="submit">Sign out</button>
            </form>
        </div>
    )
}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/app/assets/WhatsApp Image 2024-12-06 at 11.34.07 AM.jpeg'
import { redirect } from 'next/navigation'
import { getCart } from '@/lib/db/cart'
import ShoppingCartButton from './ShoppingCartButton'
import UserMenuButton from './UserMenuButton'
import { useSession } from "next-auth/react"

async function searchProducts(formData: FormData) {
    'use server'
    

    const searchQuery = formData.get('searchQuery')?.toString()

    if (searchQuery) {
        redirect('/search?query=' + searchQuery)
    }
}

export default async function Navbar() {
    const { data: session, status} = useSession()
    // const session = await getServerSession(authOptions)
    if (status === "authenticated") {
        return <p>Signed in as {session.user.email}</p>
      }
    const cart = await getCart()

    return (
        <div className="bg-base-100">
            <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl normal-case"
                    >
                        <Image
                            src={logo}
                            alt="Wears_by_Adekunle logo"
                            height={40}
                            width={40}
                        />
                        KC
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input
                                name="SearchQuery"
                                placeholder="Search"
                                className="input input-bordered w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    {/* <UserMenuButton session={session} /> */}
                </div>
            </div>
        </div>
    )
}

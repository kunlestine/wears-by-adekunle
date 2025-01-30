import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/adekunle_logo.jpeg'
import { redirect } from 'next/navigation'
import { getCart } from '@/lib/db/cart'
import ShoppingCartButton from './ShoppingCartButton'
import UserMenuButton from './UserMenuButton'
import { auth } from "@/auth";


async function searchProducts(formData: FormData) {
    'use server'
    const searchQuery = formData.get('searchQuery')?.toString()

    if (searchQuery) {
        redirect('/search?query=' + searchQuery)
    }
}

export default async function Navbar () {
    
    const session = await auth();
    const user = session?.user?.email
    const cart = await getCart()

    return (
        <div className="bg-base-100 h-28">
            <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl normal-case h-fit"
                    >
                        <Image
                            src={logo}
                            alt="Wears_by_Adekunle logo"
                            height={10}
                            width={100}
                        />

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
                {user && <p className='flex px-2'>Welcome <span className='text-blue-700'>{session?.user?.name}!</span></p>}
                <ShoppingCartButton cart={cart} />
                <UserMenuButton session={session} />    
            </div>
        </div>
    </div>
    )
}
'use client'

import React from 'react'
import { ShoppingCart } from '@/lib/db/cart'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null
}

function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    function closeDropdown() {
        const elem = document.activeElement as HTMLElement
        if (elem) {
            elem.blur()
        }
    }
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-ghost">
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-cart"
                    >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    <span className="badge indicator-item badge-sm">
                        {cart?.size || 0}
                    </span>
                </div>
            </label>
            <div
                tabIndex={0}
                className="card dropdown-content card-compact z-30 mt-3 bg-base-100 shadow"
            >
                <div className="card-body w-48">
                    <span className="text-lg font-bold">
                        {cart?.size || 0} Items
                    </span>
                    <span className="text-info">
                        Subtotal: {formatPrice(cart?.subtotal || 0)}
                    </span>
                    <div className="card-actions">
                        <Link
                            href="/cart"
                            className="btn btn-primary btn-block"
                            onClick={closeDropdown}
                        >
                            View cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartButton

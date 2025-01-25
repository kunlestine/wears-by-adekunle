'use client'

import { useTransition, useState } from 'react'

interface AddToCartButtonProps {
    productId: string
    incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({
    productId,
    incrementProductQuantity,
}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)

    return (
        <div className="flex items-center gap-2">
            <button
                className="btn btn-primary"
                onClick={() => {
                    setSuccess(false)
                    startTransition(async () => {
                        await incrementProductQuantity(productId)
                        setSuccess(true)
                    })
                }}
            >
                Add to Cart
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
            </button>
            {isPending && (
                <span className="loading loading-spinner loading-md" />
            )}
            {!isPending && success && (
                <span className="text-success">Added to Cart.</span>
            )}
        </div>
    )
}

'use server'

import { createCart, getCart } from '@/lib/db/cart'
import prisma from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'

export async function incrementProductQuantity(productId: string) {
    const existingCart = await getCart()
    const cart = existingCart ?? (await createCart()) // returns the the getCart if not null, if null it returns the createCart

    const articleInCart = cart?.items.find(
        (item) => item.productId === productId
    )

    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity: 1,
            },
        })
    }
    revalidatePath('/products/[id]')
}

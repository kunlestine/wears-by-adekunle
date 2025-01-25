import { cookies } from 'next/headers'
import prisma from './prisma'
import { Prisma } from '@prisma/client'


// 1: Define a type that includes the relation to `cart`
const cartWithProducts = Prisma.validator<Prisma.CartDefaultArgs>()({
    include: { items: { include: { product: true } }},
  })

// This type will include a Cart and all their product
type CartWithProducts = Prisma.CartGetPayload<typeof cartWithProducts>

// 1: Define a type that includes the relation to `cartItem`
const cartItemWithProduct = Prisma.validator<Prisma.CartItemDefaultArgs>()({
    include: { product: true },
  })

// This type will include a CartItem and all their product
export type CartItemWithProduct = Prisma.CartItemGetPayload<typeof cartItemWithProduct>

// shopping cart
export type ShoppingCart = CartWithProducts & {
    size: number
    subtotal: number
}
export async function getCart(): Promise<ShoppingCart | null> {
    const cookieStore = await cookies()
    const localCartId = cookieStore.get('localCartId')?.value
    const cart = localCartId
        ? await prisma.cart.findUnique({
              where: { id: localCartId },
              include: { items: { include: { product: true } } },
          })
        : null

    if (!cart) {
        return null
    }

    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        ),
    }
}

export async function createCart(): Promise<ShoppingCart | null> {
    const newCart = await prisma.cart.create({
        data: {},
    })

    const cookieStore = await cookies()
    cookieStore.set('localCartId', newCart.id, { secure: true })
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    }
}

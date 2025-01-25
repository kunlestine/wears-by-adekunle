import PriceTag from '@/components/PriceTag'
import prisma from '@/lib/db/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { cache } from 'react'
import AddToCartButton from './AddToCart'
import { incrementProductQuantity } from './actions'

interface ProductPageProps {
    params: Promise<{ id: string }>
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) notFound()
    return product
})
export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const id = (await params).id
    const product = await getProduct(id)

    return {
        title: product.name + ' - wears_by_Adekunle',
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }],
        },
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const id = (await params).id
    const product = await getProduct(id)

    if (!product) return notFound()

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Image
                src={product.imageUrl}
                alt={product.name}
                height={500}
                width={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
                <AddToCartButton
                    productId={product.id}
                    incrementProductQuantity={incrementProductQuantity}
                />
            </div>
        </div>
    )
}

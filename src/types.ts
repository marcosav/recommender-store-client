interface Product {
    id: number
    name: string
    price: number
    stock: number
    category: ProductCategory
    images: ProductImage[]
    hidden: boolean
    description: string
    lastUpdated: Date
    date: Date
    visits: number
    rating: number
    userId: number

    fav?: boolean
}

interface ProductImage {
    i: number
    u: string
}

interface PreviewProduct {
    id: number
    name: string
    price: number
    mainImage: string
    lastUpdated: Date
    visits: number
    rating: number

    fav?: boolean
}

interface ProductCategory {
    id: number
    name?: string
}

interface User {
    id: number
    nickname: string
    description: string
    profileImgUri?: string
    registerDate: Date
}

interface CartProduct {
    product: PreviewProduct
    amount: number
}

interface Date {
    seconds: number
    nanos: number
}

export type { Product, PreviewProduct, ProductCategory, User, CartProduct }

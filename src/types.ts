interface Product {
    id: number
    name: string
    price: number
    stock: number
    category: ProductCategory
    imgUris: string
    hidden: boolean
    description: string
    lastUpdated: string
    date: string
    visits: number
    rating: number
    userId: number
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
    registerDate: string
}

interface CartProduct {
    id: number
    product: Product
    amount: number
}

export type { Product, ProductCategory, User, CartProduct }

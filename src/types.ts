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

    vendorNick?: string
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
    stock: number
    mainImage: string
    lastUpdated: Date
    visits: number
    rating: number

    fav?: boolean
    onCartAmount?: number
}

interface ProductCategory {
    id: number
    name?: string
}

interface ProductReport {
    id: number
    productId: number
    userId: number
    reason: string
    date: Date
}

interface User {
    id: number
    nickname: string
    description: string
    profileImgUri?: string
    registerDate: Date

    fav?: boolean
}

interface UserDetails {
    name: string
    surname: string
    email: string
}

type DetailedUser = User & UserDetails

interface CartProduct {
    id: number
    amount: number
}

interface CartProductPreview {
    product: PreviewProduct
    amount: number
}

interface Date {
    seconds: number
    nanos: number
}

export type {
    Product,
    PreviewProduct,
    ProductCategory,
    ProductReport,
    User,
    DetailedUser,
    CartProduct,
    CartProductPreview,
}

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
    productName: string
    userNickname: string
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

interface UserAddress {
    recipient: string
    code: string
    city: string
    region: string
    country: string
    address: string
    phone: string
}

interface CartProduct {
    id: number
    amount: number
}

interface CartProductPreview {
    product: PreviewProduct
    amount: number

    removed?: boolean
    unavailable?: boolean
}

interface Date {
    seconds: number
    nanos: number
}

interface Order {
    id: number
    userId: number
    address: UserAddress
    items: OrderedProduct[]
    date: Date
}

interface OrderedProduct {
    amount: number
    unitPrice: number
    product: PreviewProduct
}

export type {
    Product,
    PreviewProduct,
    ProductCategory,
    ProductReport,
    User,
    UserAddress,
    DetailedUser,
    CartProduct,
    CartProductPreview,
    Order,
    OrderedProduct,
}

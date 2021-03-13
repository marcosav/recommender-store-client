import BaseAPI, { RPromise, StatusHandler } from './BaseAPI'

import { PreviewProduct, Product } from '../types'

export interface ProductService {
    getProduct: (id: number, handler: StatusHandler) => RPromise<Product>
    getVendorProducts: (
        id: number,
        shown: boolean,
        page: number
    ) => RPromise<SearchResult>
    searchProducts: (search: SearchProduct) => RPromise<SearchResult>
    publishProduct: (product: ProductForm, update: boolean) => RPromise<Product>
    deleteProduct: (id: number) => RPromise
}

const PRODUCT_PATH = '/product'
const VENDOR_PATH = '/vendor'

interface ProductForm {
    id?: number
    name: string
    description: string
    price: number
    stock: number
    category: number
    hidden: boolean
    image: string[]
    imageExt: string[]
}

interface SearchProduct {
    query: string
    page?: number
    category?: number
    order?: number
}

interface SearchResult {
    items: PreviewProduct[]
    total: number
}

export default class ProductAPI extends BaseAPI implements ProductService {
    getProduct = (id: number, handler: StatusHandler) =>
        this.get<Product>(`${PRODUCT_PATH}/${id}`, null, handler)

    getVendorProducts = (id: number, shown: boolean, page: number) =>
        this.get<SearchResult>(`${VENDOR_PATH}/${id}`, { shown, page })

    searchProducts = (search: SearchProduct) =>
        this.get<SearchResult>(`${PRODUCT_PATH}/list`, search)

    publishProduct = (product: ProductForm, update: boolean) =>
        (update ? this.put : this.post)<Product>(PRODUCT_PATH, product)

    deleteProduct = (id: number) => this.delete(`${PRODUCT_PATH}/${id}`)
}

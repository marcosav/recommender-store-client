import BaseAPI, { RPromise } from './BaseAPI'

import { PreviewProduct, Product } from '../types'
import { Paged } from './types'

export interface ProductService {
    getProduct: (id: number) => RPromise<Product>
    getVendorProducts: (
        id: number,
        shown: boolean,
        page: number
    ) => RPromise<Paged<PreviewProduct>>
    searchProducts: (search: SearchProduct) => RPromise<Paged<PreviewProduct>>
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

export default class ProductAPI extends BaseAPI implements ProductService {
    getProduct = (id: number) =>
        this.get<Product>(`${PRODUCT_PATH}/${id}`, null)

    getVendorProducts = (id: number, shown: boolean, page: number) =>
        this.get<Paged<PreviewProduct>>(`${VENDOR_PATH}/${id}`, { shown, page })

    searchProducts = (search: SearchProduct) =>
        this.get<Paged<PreviewProduct>>(`${PRODUCT_PATH}/list`, search)

    publishProduct = (product: ProductForm, update: boolean) =>
        (update ? this.put : this.post)<Product>(PRODUCT_PATH, product)

    deleteProduct = (id: number) => this.delete(`${PRODUCT_PATH}/${id}`)
}

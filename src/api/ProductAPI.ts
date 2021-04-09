import BaseAPI, { RPromise } from './BaseAPI'

import { PreviewProduct, Product, ProductCategory } from '../types'
import { Paged, PagedParams } from './types'
import { HttpStatusCode } from '../utils'

export interface ProductService {
    getProduct: (id: number) => RPromise<Product>
    getVendorProducts: (
        id: number,
        shown: boolean,
        params: PagedParams
    ) => RPromise<Paged<PreviewProduct>>
    searchProducts: (
        search: SearchProduct & PagedParams
    ) => RPromise<Paged<PreviewProduct>>
    publishProduct: (
        form: ProductForm,
        images: File[],
        onUploadProgress: any,
        update: boolean
    ) => RPromise<number>
    deleteProduct: (id: number) => RPromise
    findCategories: () => RPromise<ProductCategory[]>
}

const PRODUCT_PATH = '/product'
const VENDOR_PATH = '/vendor'

export interface ProductForm {
    id?: number
    name: string
    description: string
    price: number
    stock: number
    category: number
    hidden: boolean
}

interface SearchProduct {
    query: string
    category?: number
}

export default class ProductAPI extends BaseAPI implements ProductService {
    getProduct = (id: number) =>
        this.get<Product>(`${PRODUCT_PATH}/${id}`, null)

    getVendorProducts = (id: number, shown: boolean, params: PagedParams) =>
        this.get<Paged<PreviewProduct>>(
            `${PRODUCT_PATH}${VENDOR_PATH}/${id}`,
            {
                shown,
                ...params,
            },
            [HttpStatusCode.Forbidden]
        )

    searchProducts = (search: SearchProduct & PagedParams) =>
        this.get<Paged<PreviewProduct>>(`${PRODUCT_PATH}/list`, search, [
            HttpStatusCode.BadRequest,
        ])

    publishProduct = (
        form: ProductForm,
        files: File[],
        onUploadProgress: any,
        update: boolean
    ) => {
        const formData = new FormData()

        formData.append('form', JSON.stringify(form))
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            if (file !== undefined)
                formData.append(
                    `${update && file === null ? 'delete' : 'file'}${i}`,
                    file
                )
        }

        return (update ? this.putMP : this.postMP)<number>(
            '/product',
            formData,
            [HttpStatusCode.Forbidden],
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            }
        )
    }

    deleteProduct = (id: number) =>
        this.delete(`${PRODUCT_PATH}/${id}`, null, [HttpStatusCode.Forbidden])

    findCategories = () =>
        this.get<ProductCategory[]>(`${PRODUCT_PATH}/categories`)
}

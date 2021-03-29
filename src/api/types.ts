export interface Paged<T> {
    items: T[]
    total: number
    pageSize: number
}

export interface PagedParams {
    page?: number
    order?: number
}

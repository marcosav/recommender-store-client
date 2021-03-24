export interface Paged<T> {
    items: T[]
    total: number
    pageSize: number
}
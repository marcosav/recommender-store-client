import BaseAPI, { RPromise } from './BaseAPI'

import { ProductReport } from '../types'

import { Paged, PagedParams } from './types'

import { HttpStatusCode } from '../utils'

export interface ProductReportService {
    getFor: (
        params: PagedParams & ReportSearch
    ) => RPromise<Paged<ProductReport>>
    report: (productId: number, reason: string) => RPromise
    remove: (id: number) => RPromise
}

interface ReportSearch {
    productId?: number
}

const REPORT_PATH = '/product/report'

export default class ProductReportAPI
    extends BaseAPI
    implements ProductReportService {
    getFor = (params: PagedParams & ReportSearch) =>
        this.get<Paged<ProductReport>>(REPORT_PATH, params)

    report = (productId: number, reason: string) =>
        this.post(REPORT_PATH, { productId, reason }, [HttpStatusCode.NotFound])

    remove = (id: number) => this.delete(`${REPORT_PATH}/${id}`)
}

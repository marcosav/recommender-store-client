import useUserService from './UserService'
import useProductService from './ProductService'
import useFavoriteService from './FavoriteService'
import useCartService from './CartService'
import useSessionService, { Session, SessionService } from './session'
import useResourceService from './ResourceService'
import useProductReportService from './ProductReportService'
import useOrdersService from './OrdersService'
import useCollectorService from './CollectorService'

export type { Session, SessionService }

export {
    useUserService,
    useProductService,
    useFavoriteService,
    useCartService,
    useSessionService,
    useResourceService,
    useProductReportService,
    useOrdersService,
    useCollectorService,
}

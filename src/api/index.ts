import AuthAPI from './AuthAPI'
import ProductAPI from './ProductAPI'
import UserAPI from './UserAPI'
import CartAPI from './CartAPI'
import FavoriteAPI from './FavoriteAPI'
import ResourceAPI from './ResourceAPI'

import { ProductService } from './ProductAPI'
import { UserService } from './UserAPI'
import { FavoriteService } from './FavoriteAPI'
import { CartService } from './CartAPI'
import { ResourceService } from './ResourceAPI'

export { AuthAPI, ProductAPI, UserAPI, CartAPI, FavoriteAPI, ResourceAPI }

export type {
    ProductService,
    UserService,
    FavoriteService,
    CartService,
    ResourceService,
}

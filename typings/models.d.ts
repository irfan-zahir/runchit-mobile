
/**
 * Model User
 * 
 */
export type IModelUser = {
    id: string
    uid: string | null
    phone: string
    subscription: string | null
    fullName: string;
    memberOf: Array<unknown>
}

/**
 * Model Runchit
 * 
 */
export type IModelRunchit = {
    id: string
    name: string
    address: string | null
    duitnowqr: string | null
    createdAt: Date
}

/**
 * Model StoreRole
 * 
 */
export type IModelStoreRole = {
    id: string
    name: string
    permission: string | null
    storeId: string
}

/**
 * Model StoreMember
 * 
 */
export type IModelStoreMember = {
    id: string
    storeId: string
    memberId: string | null
    roles: Array<unknown>
}

/**
 * Model Inventory
 * 
 */
export type IModelInventory = {
    id: string
}

/**
 * Model Product
 * 
 */
export type IModelProduct = {
    id: string
    name: string
    price: number
    sku: string
    storeId: string
    supplierId: number
    categoryId: number
}

/**
 * Model ProductAttribute
 * 
 */
export type IModelProductAttribute = {
    id: number
    name: string
    value: string
    productId: string
}

/**
 * Model ProductCategory
 * 
 */
export type IModelProductCategory = {
    id: number
    name: string
}

/**
 * Model Supplier
 * 
 */
export type IModelSupplier = {
    id: number
    name: string
    contact: string
}
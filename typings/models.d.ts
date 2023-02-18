

/**
 * Model User
 * 
 */
export type IModelUser = {
    id: string
    uid: string | null
    phone: string
    subscription: string | null
    fullName: string
}

/**
 * Model Runchit
 * 
 */
export type IModelRunchit = {
    id: string
    name: string
    duitnowqr: string | null
    address: string | null
    createdAt: string
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
}

/**
 * Model Product
 * 
 */
export type IModelProduct = {
    id: string
    name: string
    purchase: number
    sellPrice: number
    sku: string | null
    quantityUnit: string | null
    shelfQuantity: Prisma.Decimal
    storageQuantity: Prisma.Decimal
    storeId: string
    supplierId: string | null
    categoryId: string | null
}

/**
 * Model ProductInventory
 * 
 */
export type IModelProductInventory = {
    id: string
    shelf: number
    storage: number
    location: string
    productId: string
}

/**
 * Model ProductImages
 * 
 */
export type IModelProductImages = {
    id: string
    url: string
    productId: string
}

/**
 * Model ProductAttribute
 * 
 */
export type IModelProductAttribute = {
    id: string
    name: string
    value: string
    productId: string
}

/**
 * Model ProductCategory
 * 
 */
export type IModelProductCategory = {
    id: string
    name: string
}

/**
 * Model Supplier
 * 
 */
export type IModelSupplier = {
    id: string
    name: string
    contact: string
}


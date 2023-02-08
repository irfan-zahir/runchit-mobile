
/**
 * Model User
 * 
 */
export type User = {
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
export type Runchit = {
    id: string
    name: string
    duitnowqr: string | null
    createdAt: Date
}

/**
 * Model StoreRole
 * 
 */
export type StoreRole = {
    id: string
    name: string
    permission: string | null
    storeId: string
}

/**
 * Model StoreMember
 * 
 */
export type StoreMember = {
    id: string
    storeId: string
    memberId: string | null
}

/**
 * Model Inventory
 * 
 */
export type Inventory = {
    id: string
}

/**
 * Model Product
 * 
 */
export type Product = {
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
export type ProductAttribute = {
    id: number
    name: string
    value: string
    productId: string
}

/**
 * Model ProductCategory
 * 
 */
export type ProductCategory = {
    id: number
    name: string
}

/**
 * Model Supplier
 * 
 */
export type Supplier = {
    id: number
    name: string
    contact: string
}
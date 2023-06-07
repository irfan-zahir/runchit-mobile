
export type IUserModel = {
    id: string
    phone: string
    fullName: string
    roles?: IStoreRoleModel[]
    createdAt: Date
}

/**
 * Model BankDetails
 * 
 */
export type IBankDetailsModel = {
    id: string
    account_holder: string
    code: string
    brand: string
    last_digits: string
    created_at: string
}

/**
 * Model Store
 * 
 */
export type IStoreModel = {
    id: string
    name: string
    address?: string | null
    createdAt: string
    bankId?: string | null
}

/**
 * Model StoreRole
 * 
 */
export type IStoreRoleModel = {
    id: string
    name: string
    permissions: string[]
    storeId: string
}

/**
 * Model Product
 * 
 */
export type IProductModel = {
    id: string
    name: string
    purchase: number
    sellPrice: number
    sku: string | null
    quantityUnit: string | null
    shelfQuantity: Prisma.Decimal
    storageQuantity: Prisma.Decimal
    storeId: string
}
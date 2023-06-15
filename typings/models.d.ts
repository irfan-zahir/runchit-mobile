
export type IUserModel = {
    id: string
    phone: string
    fullName: string
    createdAt: Date
    currentRole?: IStoreRoleModel
    storeMember?: IStoreMemberModel[]
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
 * Model StoreMember
 * 
 */
export type IStoreMemberModel = {
    id: string
    storeId: string
    memberId: string | null
    roles?: IStoreRoleModel[] | null
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
    roles?: IStoreRoleModel[]
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
    unit_name?: string
    purchase?: number
    unitPrice?: number
    sku?: string
    storageQuantity?: Prisma.Decimal
    shelfQuantity?: Prisma.Decimal
    images: string[]
    storeId: string
}
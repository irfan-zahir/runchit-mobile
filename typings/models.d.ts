
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
    purchase?: number | null
    unitPrice?: number | null
    sku?: string | null
    storageQuantity?: Prisma.Decimal | null
    shelfQuantity?: Prisma.Decimal | null
    storeId: string
}
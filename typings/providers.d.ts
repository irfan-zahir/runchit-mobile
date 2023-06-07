import { User as IFirebaseUser, Auth } from "firebase/auth"

interface IUserData extends IFirebaseUser {
    accessToken?: string;
    database?: IDatabaseUser
}

export interface IAuthProviderValue {
    authUser: IUserData | null;
    loading: boolean;
    logout?: () => Promise<void>;
    authenticate?: (code: string) => Promise<void>
}

export type IFunctionChildrenProps = { children: React.ReactNode | ((IAuthProviderValue) => React.ReactNode) } 

// import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { User as IFirebaseUser, Auth } from "firebase/auth"

interface IUserData extends IFirebaseUser {
    accessToken: string | undefined;
}

export interface IAuthProviderValue {
    userData: IUserData | null;
    loading: boolean;
    logout?: () => Promise<void>;
}
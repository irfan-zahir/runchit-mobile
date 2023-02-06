import { ConfirmationResult } from "firebase/auth"

declare global {
    interface Window { confirmationResult: ConfirmationResult; }

    // namespace ReactNavigation {
    //     interface AuthParamList extends AuthStackParamList { }
    // }
}
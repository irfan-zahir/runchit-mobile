import { ConfirmationResult } from "firebase/auth"
import { IBackgroundColors } from "./theme";
import { DivProps as RNMDivProps } from "react-native-magnus"

declare global {
    interface Window { confirmationResult: ConfirmationResult; }
    // namespace ReactNavigation {
    //     interface AuthParamList extends AuthStackParamList { }
    // }
}
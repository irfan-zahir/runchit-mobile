import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";

interface IHomeProps {
    testProps?: string
}

export type AuthenticatedParamList = {
    Profile: undefined;
    Home: undefined;
    Sales: undefined;
    Inventory: undefined;
    Store: undefined;
}

export type AuthenticatedScreenProps<Screen extends keyof AuthenticatedParamList> = DrawerScreenProps<AuthenticatedParamList, Screen>
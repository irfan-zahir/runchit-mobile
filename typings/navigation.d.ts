import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";

interface IHomeProps {
    testProps?: string
}

export type AuthenticatedParamList = {
    Profile: { previousScreen: keyof AuthenticatedParamList };
    Home: undefined;
    Sales: undefined;
    Inventory: undefined;
    Configurations: undefined;
    Registration: undefined;
}

export type AuthenticatedScreenProps<Screen extends keyof AuthenticatedParamList> = DrawerScreenProps<AuthenticatedParamList, Screen>
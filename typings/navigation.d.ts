import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface IHomeProps {
    testProps?: string
}

export type AuthenticatedParamList = {
    "Profile": { previousScreen: number };
    "Home": undefined;
    "Sales": undefined;
    "Inventory": undefined;
    "Settings": undefined;
    "Registration": undefined;
}

export type AuthenticatedScreenProps<Screen extends keyof AuthenticatedParamList> = BottomTabScreenProps<AuthenticatedParamList, Screen>

export type ConfigurationsParamList = {
    "Configurations List": undefined;
    Roles: undefined;
    Members: undefined;
}

export type ConfigurationsScreenProps<Screen extends keyof ConfigurationsParamList> = NativeStackScreenProps<
    ConfigurationsParamList,
    Screen
>
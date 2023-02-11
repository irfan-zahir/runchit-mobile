import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

export type ConfigurationsParamList = {
    "ConfigList": undefined;
    Roles: undefined;
    Members: undefined;
}

export type ConfigurationsScreenProps<Screen extends keyof ConfigurationsParamList> = NativeStackScreenProps<
    ConfigurationsParamList,
    Screen
>
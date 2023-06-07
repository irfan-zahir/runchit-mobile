import ProvidersWrapper from '@providers/index'
import { SplashScreen, Stack } from "expo-router"

import {
    useFonts,
    FiraSans_100Thin,
    FiraSans_300Light,
    FiraSans_400Regular,
    FiraSans_500Medium,
    FiraSans_600SemiBold,
    FiraSans_700Bold,
    FiraSans_800ExtraBold,
    FiraSans_900Black,
    FiraSans_200ExtraLight,
} from '@expo-google-fonts/fira-sans';
import { StatusBar } from 'react-native';
import { Container } from '@components/container';


export const unstable_settings = {
    initialRouteName: "landing",
};

const RunchitLayout = () => {


    const [fontsLoaded] = useFonts({
        fira_100: FiraSans_100Thin,
        fira_200: FiraSans_200ExtraLight,
        fira_300: FiraSans_300Light,
        fira_400: FiraSans_400Regular,
        fira_500: FiraSans_500Medium,
        fira_600: FiraSans_600SemiBold,
        fira_700: FiraSans_700Bold,
        fira_800: FiraSans_800ExtraBold,
        fira_900: FiraSans_900Black,
    });

    if (!fontsLoaded) {
        // The native splash screen will stay visible for as long as there
        // are `<SplashScreen />` components mounted. This component can be nested.

        return <SplashScreen />;
    }

    // const { top: topInset } = useSafeAreaInsets()
    StatusBar.setBarStyle("dark-content")

    return (
        <ProvidersWrapper>
            <Stack initialRouteName='landing' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='landing' options={{ animation: "none" }} />
                <Stack.Screen name='(authentication)/login' />
                <Stack.Screen name='(authentication)/registration' options={{
                    presentation: "modal",
                    gestureEnabled: false,
                    contentStyle: {
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        backgroundColor: "transparent"
                    }
                }} />
            </Stack>
        </ProvidersWrapper>

    );
}

export default RunchitLayout
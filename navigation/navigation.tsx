import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { AuthenticatedParamList, AuthenticatedScreenProps } from '@typings/navigation.d'
import React from 'react'
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer"

import { AuthContext } from '@providers/AuthProvider'

// import { Drawer } from '@components/drawer/Drawer'
import { initializeAxios } from '@api/index'
import { getCurrentUserData } from '@api/user.api'

import { Home, Inventory, Profile, Sales, Configurations } from '@screens/authenticated'
import { Registration } from '@screens/registration/Registration'
import { Login } from '@screens/login/Login'
import { appDispatch, selector } from '@rtk/store'
import { setCurrentUser } from '@rtk/slices/currentUser.slice'

import { ActivityIndicator } from "react-native"
import { selectUserStore } from '@rtk/selectors/store.selector'
import { fetchStores } from '@rtk/slices/store.slice'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBar } from '@components/tabBar/TabBar'
import { Header } from '@components/header/Header'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { Div } from 'react-native-magnus'
import { Sidebar } from '@components/sidebar/Sidebar'

const Navigation = () => {
    const { currentStore } = selector(selectUserStore)
    const { authUser } = React.useContext(AuthContext)
    if (authUser?.accessToken) initializeAxios(authUser.accessToken, currentStore?.id)

    return !authUser
        ? <Login />
        : (
            <NavigationContainer>
                {/* <SideBarContainer> */}
                <RootNavigator />
                {/* </SideBarContainer> */}
            </NavigationContainer>
        )
}

const SideBarStack = createDrawerNavigator()
const AuthStack = createBottomTabNavigator<AuthenticatedParamList>()

const RootNavigator = () => {

    const getScreenOptions: (props: AuthenticatedScreenProps<keyof AuthenticatedParamList>) => BottomTabNavigationOptions = ({ route }) => {
        const headerShown = route.name !== "Profile" && route.name !== "Registration"
        return {
            headerShown,
            tabBarHideOnKeyboard: true,
            header: (props) => <Header {...props} />
        }
    }

    const [loading, setLoading] = React.useState(true)
    const [initialRouteName, setInitialRouteName] = React.useState<keyof AuthenticatedParamList>("Home")
    const [previousScreen, setPreviousScreen] = React.useState(1)

    const dispatch = appDispatch()

    const getInitialData = async () => {
        const res = await getCurrentUserData()

        if (res.message === "new-user") setInitialRouteName("Registration")
        if (res.currentUser) {
            dispatch(setCurrentUser(res.currentUser))
            dispatch(fetchStores())
        }
        setLoading(false)
    }

    React.useEffect(() => {
        getInitialData()

        return () => { }
    }, [])

    return (
        loading ? <ActivityIndicator />
            : (
                <SideBarStack.Navigator
                    drawerContent={(props) => <Sidebar previousScreen={previousScreen} {...props} />}
                    screenOptions={{
                        headerShown: false,
                        drawerType: "slide",
                        drawerPosition: "right",
                        drawerStyle: { width: 75 }
                    }}>
                    <SideBarStack.Screen name='authenticated'>
                        {(props) => (
                            <AuthStack.Navigator
                                initialRouteName={initialRouteName}
                                screenListeners={{
                                    //@ts-ignore
                                    state: ({ data }) => data.state.index !== 0 && setPreviousScreen(data?.state.index)
                                }}
                                screenOptions={getScreenOptions}
                                tabBar={(props) => <TabBar {...props} />}>
                                <AuthStack.Screen name="Profile" component={Profile} />
                                <AuthStack.Screen name="Home" component={Home} />
                                <AuthStack.Screen name="Inventory" component={Inventory} />
                                <AuthStack.Screen name="Sales" component={Sales} />
                                <AuthStack.Screen name="Settings" component={Configurations} />
                                <AuthStack.Screen name="Registration" component={Registration} />
                            </AuthStack.Navigator>
                        )}
                    </SideBarStack.Screen>
                </SideBarStack.Navigator>
            )
    )
}

export default Navigation
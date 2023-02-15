import { NavigationContainer } from '@react-navigation/native'
import { AuthenticatedParamList, AuthenticatedScreenProps } from '@typings/navigation.d'
import React from 'react'
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer"

import { AuthContext } from '@providers/AuthProvider'

import { Drawer } from '@components/drawer/Drawer'
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

const Navigation = () => {
    const { currentStore } = selector(selectUserStore)
    const { authUser } = React.useContext(AuthContext)
    if (authUser?.accessToken) initializeAxios(authUser.accessToken, currentStore?.id)

    return !authUser
        ? <Login />
        : (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )
}

const AuthStack = createBottomTabNavigator<AuthenticatedParamList>()

const RootNavigator = () => {


    const getScreenOptions: (props: AuthenticatedScreenProps<any>) => BottomTabNavigationOptions = ({ route }) => {
        const headerShown = route.name !== "Profile"
        return {
            headerShown,
            tabBarHideOnKeyboard: true,
            // sceneContainerStyle: {
            //     paddingTop: route.name === "Profile" || route.name === "Settings" ? 0 : 8,
            //     paddingHorizontal: route.name === "Profile" || route.name === "Settings" ? 0 : 16
            // }
        }
    }

    const [loading, setLoading] = React.useState(true)
    const [initialRouteName, setInitialRouteName] = React.useState<keyof AuthenticatedParamList>("Home")

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
            : <AuthStack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={getScreenOptions}
                tabBar={(props) => <TabBar {...props} />}
            // drawerContent={(props) => <Drawer {...props} />}
            >
                <AuthStack.Screen name="Profile" component={Profile} />
                <AuthStack.Screen name="Home" component={Home} />
                <AuthStack.Screen name="Inventory" component={Inventory} />
                <AuthStack.Screen name="Sales" component={Sales} />
                <AuthStack.Screen name="Settings" component={Configurations} />
                <AuthStack.Screen name="Registration" component={Registration} />
            </AuthStack.Navigator>
    )
}

export default Navigation
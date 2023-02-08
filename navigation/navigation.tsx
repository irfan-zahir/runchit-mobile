import { NavigationContainer } from '@react-navigation/native'
import { AuthenticatedParamList } from '@typings/navigation.d'
import React from 'react'
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer"

import { AuthContext } from '@providers/AuthProvider'

import { Drawer } from '@components/drawer/Drawer'
import { initializeAxios } from '@api/index'
import { getCurrentUserData } from '@api/user.api'

import { Home, Inventory, Profile, Sales, Store } from '@screens/authenticated'
import { Registration } from '@screens/registration/Registration'
import { Login } from '@screens/login/Login'
import { appDispatch, selector } from '@rtk/store'
import { setCurrentUser } from '@rtk/slices/currentUser.slice'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'

import { ActivityIndicator } from "react-native"

const Navigation = () => {
    const { userData } = React.useContext(AuthContext)
    if (userData?.accessToken) initializeAxios(userData.accessToken)

    return !userData
        ? <Login />
        : (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )
}

const AuthStack = createDrawerNavigator<AuthenticatedParamList>()

const RootNavigator = () => {

    const screenOptions: DrawerNavigationOptions = {
        headerShown: false,
        drawerType: "front",
        sceneContainerStyle: {
            paddingTop: 8,
            paddingHorizontal: 16
        }
    }

    const [loading, setLoading] = React.useState(true)
    const [initialRouteName, setInitialRouteName] = React.useState<keyof AuthenticatedParamList>("Home")

    const dispatch = appDispatch()

    const getInitialUserData = async () => {
        const res = await getCurrentUserData()

        if (res.message === "new-user") setInitialRouteName("Registration")
        if (res.currentUser) {
            dispatch(setCurrentUser(res.currentUser))
            setInitialRouteName("Home")
        }
        setLoading(false)
    }

    React.useEffect(() => {
        getInitialUserData()

        return () => { }
    }, [])


    return (
        loading ? <ActivityIndicator />
            : <AuthStack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={screenOptions}

                drawerContent={(props) => <Drawer {...props} />}>
                <AuthStack.Screen name='Profile' component={Profile} />
                <AuthStack.Screen name='Home' component={Home} />
                <AuthStack.Screen name='Sales' component={Sales} />
                <AuthStack.Screen name='Inventory' component={Inventory} />
                <AuthStack.Screen name='Store' component={Store} />
                <AuthStack.Screen name='Registration' component={Registration} options={{ swipeEnabled: false }} />
            </AuthStack.Navigator>
    )
}

export default Navigation
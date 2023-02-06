import { NavigationContainer } from '@react-navigation/native'
import { AuthenticatedParamList } from '@typings/navigation.d'
import React from 'react'
import { Login } from '@screens/login/Login'
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer"

import { Text } from "react-native-magnus"
import { AuthContext } from '@providers/AuthProvider'

import { Home, Inventory, Sales, Store } from '@screens/authenticated'
import { Drawer } from '@components/drawer/Drawer'
import { StyleProp, ViewStyle } from 'react-native'
import { initializeAxios } from '@api/index'

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

const Profile = () => <Text>Profile</Text>

const RootNavigator = () => {

    const screenOptions: DrawerNavigationOptions = {
        headerShown: false,
        drawerType: "front",
        sceneContainerStyle: {
            paddingTop: 8,
            paddingHorizontal: 16
        }
    }

    return (
        <AuthStack.Navigator
            initialRouteName='Home'
            screenOptions={screenOptions}

            drawerContent={(props) => <Drawer {...props} />}>
            <AuthStack.Screen name='Profile' component={Profile} />
            <AuthStack.Screen name='Home' component={Home} />
            <AuthStack.Screen name='Sales' component={Sales} />
            <AuthStack.Screen name='Inventory' component={Inventory} />
            <AuthStack.Screen name='Store' component={Store} />
        </AuthStack.Navigator>
    )
}

export default Navigation
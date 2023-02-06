import { Button } from '@components/button'
import { Typography } from '@components/typography'
import { AuthContext } from '@providers/AuthProvider'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { Div } from "react-native-magnus"

import { DrawerFooter } from './DrawerFooter'

export const Drawer = (props: DrawerContentComponentProps) => {

    const { state, descriptors, navigation } = props
    const { userData, logout } = React.useContext(AuthContext)

    const [profileRoute, ...drawerRoutes] = state.routeNames
    const currentScreenIndex = state.index - 1
    return (
        <Div flex={1} p={8}>
            <Div flex={1}>
                <Typography>Header</Typography>
            </Div>

            <Div flex={3}>
                {
                    drawerRoutes.map((route, i) => {
                        return (
                            <Button
                                key={i}
                                mb={8}
                                justifyContent='flex-start'
                                variant={currentScreenIndex === i ? "solid" : "bare"}
                                onPress={() => navigation.navigate(route)}
                            >
                                {route}
                            </Button>
                        )
                    })
                }
            </Div>
            <DrawerFooter {...props} logout={logout} />
        </Div>
    )
}

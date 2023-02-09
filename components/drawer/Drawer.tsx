import { Button } from '@components/button'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { Div } from "react-native-magnus"

import { DrawerFooter } from './DrawerFooter'
import { DrawerHeader } from './DrawerHeader'

export const Drawer = (props: DrawerContentComponentProps) => {

    const { state, descriptors, navigation } = props

    const [profileRoute, ...drawerRoutes] = state.routeNames
    const currentScreenIndex = state.index - 1

    const navigateToProfile = () => navigation.navigate(profileRoute)

    return (
        <Div flex={1}>
            <DrawerHeader navigateToProfile={navigateToProfile} />

            <Div p={8} flex={5}>
                <Div flex={3}>
                    {
                        drawerRoutes.map((route, i) => {
                            return (
                                <Button
                                    key={i}
                                    mb={8}
                                    block
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

                <DrawerFooter {...props} />
            </Div>
        </Div>
    )
}

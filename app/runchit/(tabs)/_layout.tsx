import { Container } from '@components/container'
import { TabBar } from '@components/tabBar'
import { useTabBarControl } from '@providers/TabBarProvider'
import { useRoute } from '@react-navigation/native'
import { fetchProducts } from '@rtk/slices/products.slice'
import { appDispatch } from '@rtk/store'
import { Tabs } from 'expo-router'
import React from 'react'

function RootAppLayout() {
    const { tabBarVisible } = useTabBarControl()
    const dispatch = appDispatch()
    const params: Readonly<Record<string, any> | undefined> = useRoute().params

    return (
        <Container flex={1} px={0} py={0} safeTop level={2}>

            <Tabs

                screenListeners={{
                    focus: ({ target, data, type }) => {
                        const targetScreen = target?.split("-")[0]

                        if (targetScreen === "inventory" && params?.refresh !== false) dispatch(fetchProducts())
                    }
                }}
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={({ state: { routeNames, index }, insets }) => {
                    if (!tabBarVisible) return undefined
                    return <TabBar activeIndex={index} routes={routeNames} inset={insets} />
                }}
            >
                <Tabs.Screen key={1} name='dashboard' />
                <Tabs.Screen key={2} name='inventory' />
                <Tabs.Screen key={3} name='sales' />
                <Tabs.Screen key={4} name='settings' />
            </Tabs>
        </Container>
    )
}

export default RootAppLayout
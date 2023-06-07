import { SidebarHeader } from '@components/sidebar'
import { TabBar } from '@components/tabBar'
import { Typography } from '@components/typography'
import { useTabBarControl } from '@providers/TabBarProvider'
import { Tabs } from 'expo-router'
import React from 'react'
import { Div, Icon } from 'react-native-magnus'

function RootAppLayout() {
    const { tabBarVisible } = useTabBarControl()
    return (
        <Tabs
            screenOptions={{
                header: () => <SidebarHeader />
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
    )
}

export default RootAppLayout
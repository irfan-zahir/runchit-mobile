import { Typography } from '@components/typography'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Pressable } from 'react-native'
import { Div, DivProps, Icon, IconProps } from 'react-native-magnus'

export const TabBar: React.FC<BottomTabBarProps> = (props) => {
    const { insets, state, navigation } = props
    const activeIndex = state.index - 1
    const [profileRoute, ...drawerRoutes] = state.routeNames.slice(0, -1)

    const getNavigatorIcon = (route: string, isActive: boolean) => {
        const style = { fontSize: isActive ? 24 : 32, color: isActive ? "white" : "primary" }

        if (route === "Home") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='home-assistant' />
        if (route === "Inventory") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='package-variant' />
        if (route === "Sales") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='point-of-sale' />
        if (route === "Settings") return <Icon {...style} fontFamily='MaterialIcons' name='settings' />
        return undefined
    }

    if(state.routeNames[state.index] === "Profile" 
    || state.routeNames[state.index] === "Register") return null

    return (
        <Div 
        flexDir='row'
        alignItems='center' 
        justifyContent='center' 
        bg='base' 
        rounded="circle" 
        shadow="sm" 
        py={8} mx={16} mb={insets.bottom}>
            {
                drawerRoutes.map((route, i) => {
                    const isActive = activeIndex === i
                    const containerStyle: DivProps = {
                        flexDir: 'row',
                        rounded: "circle",
                        px: 8, py: 4,
                        bg: isActive ? "primary" : undefined,
                        mx: isActive ? 16 : 0
                    }
                    return (
                        <Pressable key={i} onPress={() => navigation.navigate(route)}>
                            <Div {...containerStyle}>
                                {getNavigatorIcon(route, isActive)}
                                {isActive && <Typography ms={8} variant='title' color='white'>{route}</Typography>}
                            </Div>
                        </Pressable>
                    )
                })
            }
        </Div>
    )
}

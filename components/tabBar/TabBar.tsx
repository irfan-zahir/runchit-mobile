import React from 'react'
import { Link, useNavigation } from "expo-router"
import { EdgeInsets } from 'react-native-safe-area-context'
import { Avatar, Button, Div, DivProps, Icon } from 'react-native-magnus'
import { Pressable } from 'react-native'
import { Typography } from '../typography'
import capitalize from '@hooks/capitalize'
import Animated, { FadeIn } from 'react-native-reanimated'
import { selector } from '@rtk/store'
import { selectUserState } from '@rtk/selectors/currentUser.selector'

interface ITabBarProps {
    routes: string[],
    inset: EdgeInsets,
    activeIndex: number
}

export const TabBar: React.FC<ITabBarProps> = ({ inset, routes, activeIndex }) => {
    const navigation = useNavigation()
    const { userData } = selector(selectUserState)

    const getNavigatorIcon = (route: string, isActive: boolean) => {
        const style = { fontSize: isActive ? 24 : 32, color: isActive ? "white" : "indigo600" }

        if (route === "dashboard") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='home-analytics' />
        if (route === "inventory") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='package-variant' />
        if (route === "sales") return <Icon {...style} fontFamily='MaterialCommunityIcons' name='cash-register' />
        if (route === "settings") return <Icon {...style} fontFamily='MaterialIcons' name='settings' />
        return undefined
    }

    return (
        <Animated.View entering={FadeIn}>
            <Div py={8} pb={inset.bottom}
                flexDir='row'
                alignItems='center'
                justifyContent='center'
                bg='indigo100'
                shadow="md"
            >
                {
                    routes.map((route, i) => {
                        const isActive = activeIndex === i
                        const containerStyle: DivProps = {
                            flexDir: 'row',
                            rounded: "circle",
                            px: 8, py: 4,
                            bg: isActive ? "indigo600" : undefined,
                            mx: isActive ? 16 : 0,
                            alignItems: "center"
                        }
                        return (
                            <Pressable key={i} onPress={() => navigation.navigate(route as never)}>
                                <Div {...containerStyle}>
                                    {getNavigatorIcon(route, isActive)}
                                    {isActive && <Typography mx={8} variant='s2' color='white'>{capitalize(route)}</Typography>}
                                </Div>
                            </Pressable>
                        )
                    })
                }
                <Link href="/modal/profile" asChild>
                    <Button bg='transparent'>
                        <Avatar size={36} bg='teal600' color='#fff' fontSize={18}>
                            {userData && userData.fullName[0]}
                        </Avatar>
                    </Button>
                </Link>
            </Div>
        </Animated.View>
    )
}

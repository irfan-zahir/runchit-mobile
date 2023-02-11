import React from 'react'
import { ConfigurationsParamList, ConfigurationsScreenProps } from '@typings/navigation.d'
import { Div, Icon } from 'react-native-magnus'
import { Pressable, ScrollView } from 'react-native'
import { Typography } from '@components/typography'

type IConfigurationScreens = Omit<ConfigurationsParamList, "ConfigList">
type IConfigurationScreensDetails = { icon: string; description: string }

export const ConfigList = ({ navigation, route }: ConfigurationsScreenProps<"ConfigList">) => {
    const [configListRoute, ...configsRoutes] = navigation.getState().routeNames

    const icons: Record<keyof IConfigurationScreens, IConfigurationScreensDetails> = {
        "Members": {
            icon: "people-alt",
            description: "Manage or invite users to be part of store member and assign roles to them"
        },
        "Roles": {
            icon: "admin-panel-settings",
            description: "Manage roles that are available in current store with their permissions while accessing Runchit"
        },
    }

    return (
        <Div flex={1}>
            <ScrollView style={{ flex: 1 }}>
                {
                    configsRoutes.map((configRoute, i) => {
                        const { icon, description } = icons[configRoute as keyof IConfigurationScreens]
                        return (
                            <Pressable key={i} onPress={() => navigation.navigate(configRoute)}>
                                <Div flexDir='row' py={8} mb={4}>
                                    <Icon color='primary' fontFamily='MaterialIcons' fontSize={24} name={icon} />
                                    <Div flex={1} ms={8}>
                                        <Typography variant='subtitle'>{configRoute}</Typography>
                                        <Typography variant='small'>{description}</Typography>
                                    </Div>
                                </Div>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </Div>
    )
}

import { Container } from '@components/container'
import { Typography } from '@components/typography'
import { useTabBarControl } from '@providers/TabBarProvider'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Div, Fab, Icon } from 'react-native-magnus'

function Inventory() {
    const router = useRouter()
    const tabbar = useTabBarControl()
    return (
        <Container fullscreen level={2}>
            <Typography>
                Inventory
            </Typography>
            <Button onPress={() => {
                if (tabbar.tabBarVisible) tabbar.hide && tabbar.hide()
                if (!tabbar.tabBarVisible) tabbar.show && tabbar.show()
            }}>
                {tabbar?.tabBarVisible ? "Hide" : "Show"}
            </Button>
        </Container>
    )
}

export default Inventory
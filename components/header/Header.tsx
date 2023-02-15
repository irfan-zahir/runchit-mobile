import { Typography } from '@components/typography'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Button, Div, Icon } from 'react-native-magnus'
import { DrawerActions } from '@react-navigation/native'
import { useDrawerStatus } from '@react-navigation/drawer'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

export const Header: React.FC<BottomTabHeaderProps> = (props) => {
    const drawerOpen = useDrawerStatus() === "open"
    const { route, navigation } = props
    return (
        <SafeAreaInsetsContext.Consumer>
            {insets => (
                <Div bg='base' position='relative' flexDir='row' justifyContent='center' px={16} py={8} mt={insets?.top}>
                    <Typography variant='subheading' color='primary'>
                        {route.name}
                    </Typography>
                    <Button
                        position='absolute'
                        p={0} m={0} rounded="circle" bg='transparent'
                        top={0} bottom={0} right={16}
                        // ()=>navigation.navigate("Profile", {previousScreen: route.name})
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Icon
                            color='primary'
                            fontSize={24}
                            fontFamily='AntDesign' name={drawerOpen ? 'menu-fold' : 'menu-unfold'} />
                    </Button>
                </Div>
            )}
        </SafeAreaInsetsContext.Consumer>
    )
}

import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { Div, Icon } from 'react-native-magnus'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { Pressable } from "react-native"
import useModal from '@hooks/useModal'
import { SwitchStoreModal } from './SwitchStoreModal'
import { SwitchRoleModal } from './SwitchRoleModal'
import { CommonActions } from '@react-navigation/native'

interface ISidebarProps extends DrawerContentComponentProps {
    previousScreen: number
}

export const Sidebar = ({ navigation, state, previousScreen }: ISidebarProps) => {

    const storesModal = useModal()
    const rolesModal = useModal()

    const navigateToProfile = () =>
        navigation.dispatch(CommonActions.navigate({ name: "Profile", params: { previousScreen } }))

    return (
        <SafeAreaInsetsContext.Consumer>
            {
                insets => (
                    <Div flex={1} pt={insets?.top} pb={insets?.bottom} alignItems="center">
                        <Pressable
                            onPress={() => navigateToProfile()}
                            style={{ marginTop: 4 }}>
                            <Icon
                                fontFamily='Octicons'
                                name='feed-person'
                                color='primary'
                                fontSize={32} />
                        </Pressable>
                        <Div flex={1} justifyContent="flex-end" mb={12}>
                            <Pressable style={{ marginBottom: 32 }} onPress={() => rolesModal.openModal()}>
                                <Icon fontFamily='MaterialCommunityIcons' fontSize={32} name='shield-sync-outline' color='secondary' />
                                <SwitchRoleModal {...rolesModal} />
                            </Pressable>
                            <Pressable style={{ marginBottom: 32 }} onPress={() => storesModal.openModal()}>
                                <Icon fontFamily='MaterialCommunityIcons' fontSize={32} name='home-switch' color='secondary' />
                                <SwitchStoreModal {...storesModal} />
                            </Pressable>
                            <Pressable onPress={() => rolesModal.openModal()}>
                                <Icon fontFamily='MaterialCommunityIcons' fontSize={32} name='logout' color='danger' />
                            </Pressable>
                        </Div>
                    </Div>
                )
            }
        </SafeAreaInsetsContext.Consumer>
    )
}

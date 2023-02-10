import { Button } from '@components/button'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'
import { selector } from '@rtk/store'
import React from 'react'
import { Pressable } from 'react-native'
import { Avatar, Div, Icon, Modal } from 'react-native-magnus'
import { SwitchRoleModal } from './SwitchRoleModal'

interface IDrawerHeaderProps {
    navigateToProfile: () => void
}

export const DrawerHeader = ({ navigateToProfile }: IDrawerHeaderProps) => {

    const { userData } = selector(selectCurrentUser)

    const roleModal = useModal()

    return (
        <Div flex={1} p={8} bg="primary" justifyContent='flex-end'>
            <Div flexDir='row' alignItems='center' alignSelf='stretch'>
                <Pressable onPress={() => navigateToProfile()}>
                    <Avatar bg='secondary' color='gray400'>{userData?.fullName[0]}</Avatar>
                </Pressable>
                <Pressable style={{ flex: 1 }} onPress={() => roleModal.openModal()}>
                    <Div flexDir='column' justifyContent='flex-start' p={4} ms={16}>
                        <Typography variant='subtitle' color='gray400' mb={8}>Hello, {userData?.fullName}!</Typography>
                        <Div flexDir='row' alignSelf='stretch' justifyContent='space-between'>
                            <Typography variant='body' color='white'>
                                Owner
                            </Typography>
                            <Icon name='swap-horiz' fontFamily='MaterialIcons' fontSize={24} color="success" />
                        </Div>
                    </Div>
                </Pressable>
            </Div>
            <SwitchRoleModal {...roleModal} />
        </Div>
    )
}

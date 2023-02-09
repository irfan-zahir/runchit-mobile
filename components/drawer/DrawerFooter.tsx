import { Button } from '@components/button'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { AuthContext } from '@providers/AuthProvider'

import { Div, Icon } from "react-native-magnus"

interface IDrawerFooterProps extends DrawerContentComponentProps {

}

export const DrawerFooter = (props: IDrawerFooterProps) => {
    const { logout } = React.useContext(AuthContext)
    const { state, descriptors, navigation } = props

    return (
        <Div flex={1} mb={24} justifyContent="flex-end">
            <Button
                mb={8}
                justifyContent='flex-start'
                variant="bare"
                bg="danger"
                onPress={async () => await (logout && logout())}
                prefix={<Icon fontFamily='MaterialIcons' fontSize={24} mr={8} name='logout' color='danger' />}
            >
                Logout
            </Button>
        </Div>
    )
}

import { Button } from '@components/button'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { selectUserStore } from '@rtk/selectors/store.selector'
import { selector } from '@rtk/store'
import React from 'react'

import { Div, Icon } from "react-native-magnus"
import { SwitchStoreModal } from './SwitchStoreModal'

interface IDrawerFooterProps extends DrawerContentComponentProps {

}

export const DrawerFooter = (props: IDrawerFooterProps) => {
    const { state, descriptors, navigation } = props

    const { currentStore, stores } = selector(selectUserStore)
    const storeCount = stores?.length ?? 0

    const storesModal = useModal()

    return (
        <Div flex={1} mb={24} justifyContent="flex-end">
            <Button
                block
                mb={8}
                variant="bare"
                bg="secondary"
                onPress={async () => storesModal.openModal()}
                prefix={<Icon fontFamily='MaterialIcons' fontSize={24} mr={8} name='storefront' color='secondary' />}
                suffix={<Icon fontFamily='MaterialIcons' fontSize={24} mr={8} name='swap-horiz' color='secondary' />}
            >
                <Typography flex={1} color="secondary">
                    {currentStore?.name}
                </Typography>
            </Button>
            <SwitchStoreModal {...storesModal} />
        </Div>
    )
}

import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Typography } from '@components/typography'
import { Div, Icon } from 'react-native-magnus'
// import usePermissions from '@hooks/usePermissions'
import BoxIcon from '@svgs/BoxIcon'
import { CreateInventory } from './CreateInventory'

export const Inventory = (props: AuthenticatedScreenProps<"Inventory">) => {
    // const { camera } = usePermissions()
    return (
        <Div flex={1}>
            <Typography>Inventory</Typography>
            <CreateInventory />
        </Div>
    )
}

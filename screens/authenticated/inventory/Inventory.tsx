import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Typography } from '@components/typography'
import { Div } from 'react-native-magnus'
// import { InventoryScanner } from './scanner/InventoryScanner'
import usePermissions from '@hooks/usePermissions'

export const Inventory = (props: AuthenticatedScreenProps<"Inventory">) => {
    const { camera } = usePermissions()
    return (
        <Div flex={1}>
            <Typography>Inventory</Typography>
            {/* <InventoryScanner /> */}
        </Div>
    )
}

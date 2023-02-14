import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Typography } from '@components/typography'
import { Div, Icon } from 'react-native-magnus'
// import usePermissions from '@hooks/usePermissions'
import BoxIcon from '@svgs/BoxIcon'
import { CreateInventory } from './CreateInventory'
import { appDispatch, selector } from '@rtk/store'
import { selectProducts } from '@rtk/selectors/products.selector'
import { fetchProducts } from '@rtk/slices/products.slice'
import { RefreshControl, ScrollView } from 'react-native'

export const Inventory = (props: AuthenticatedScreenProps<"Inventory">) => {
    const dispatch = appDispatch()
    const { products, loading } = selector(selectProducts)

    React.useEffect(() => {
        dispatch(fetchProducts())

        return () => { }
    }, [])


    return (
        <Div flex={1}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => dispatch(fetchProducts())} />
                }>
                <Div>
                    <Typography>Inventory</Typography>
                    <Div flex={1}>
                        {
                            !loading &&
                            products.map((product, i) => {
                                return (
                                    <Typography key={i}>{product.name}</Typography>
                                )
                            })
                        }
                    </Div>
                </Div>
            </ScrollView>

            <CreateInventory />
        </Div>
    )
}

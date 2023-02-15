import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Div } from 'react-native-magnus'
// import usePermissions from '@hooks/usePermissions'
import { CreateInventory } from './CreateInventory'
import { appDispatch, selector } from '@rtk/store'
import { selectProducts } from '@rtk/selectors/products.selector'
import { fetchProducts } from '@rtk/slices/products.slice'
import { RefreshControl, ScrollView } from 'react-native'
import { ProductListItem } from './ProductListItem'

export const Inventory = (props: AuthenticatedScreenProps<"Inventory">) => {
    const dispatch = appDispatch()
    const { products, loading } = selector(selectProducts)

    React.useEffect(() => {
        dispatch(fetchProducts())

        return () => { }
    }, [])


    return (
        <Div flex={1} px={16}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => dispatch(fetchProducts())} />
                }>
                <Div flex={1}>
                    {!loading && products.map((product, i) => <ProductListItem product={product} key={i} />)}
                </Div>
            </ScrollView>

            <CreateInventory />
        </Div>
    )
}

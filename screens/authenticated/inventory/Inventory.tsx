import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Div, Icon } from 'react-native-magnus'
// import usePermissions from '@hooks/usePermissions'
import { CreateInventory } from './CreateInventory'
import { appDispatch, selector } from '@rtk/store'
import { selectProducts } from '@rtk/selectors/products.selector'
import { fetchProducts } from '@rtk/slices/products.slice'
import { RefreshControl, ScrollView, Pressable } from 'react-native'
import { ProductListItem } from './ProductListItem'
import { Form, FormInput } from '@components/forms'
import { SkuScanner } from './SkuScanner'
import { Button } from '@components/button'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

export const Inventory = (props: AuthenticatedScreenProps<"Inventory">) => {
    const dispatch = appDispatch()
    const { products, loading } = selector(selectProducts)

    const [showScanner, setShowScanner] = React.useState(false)

    React.useEffect(() => {
        dispatch(fetchProducts())

        return () => { }
    }, [])


    const SkuSuffix = () => {
        return (
            <Pressable onPress={() => setShowScanner(true)}>
                <Icon name='barcode-outline' fontSize={24} color="primary" fontFamily='Ionicons' />
            </Pressable>
        )
    }

    const onSkuScanned = (sku: string) => {

    }

    return (
        <Div flex={1} p={16}>
            <Form<{ name: string }>>
                {
                    !showScanner
                        ? <FormInput name='name' placeholder='Search for product' suffix={<SkuSuffix />} />
                        : <SkuScanner onScanned={onSkuScanned} onCancelScan={() => setShowScanner(false)} />
                }
            </Form>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => dispatch(fetchProducts())} />
                }>
                <Div flex={1} py={16}>
                    {!loading && products.map((product, i) => <ProductListItem product={product} key={i} />)}
                </Div>
            </ScrollView>

            <CreateInventory />
        </Div>
    )
}

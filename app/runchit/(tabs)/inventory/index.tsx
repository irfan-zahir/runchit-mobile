import { Container } from '@components/container'
import { Typography } from '@components/typography'
import { useTabBarControl } from '@providers/TabBarProvider'
import { selectProducts } from '@rtk/selectors/products.selector'
import { appDispatch, selector } from '@rtk/store'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React from 'react'
import { Button, Div, Fab, Icon, Input, ScrollDiv } from 'react-native-magnus'
import { Pressable } from 'react-native'
import { IProductModel } from '@typings/models'
import { fetchProducts } from '@rtk/slices/products.slice'

function Inventory() {
    const dispatch = appDispatch()
    const navigation = useNavigation()
    const router = useRouter()
    const params = useLocalSearchParams()
    const products = selector(selectProducts)

    const [isGrid, setIsGrid] = React.useState(true)

    const onSearch = (data: Record<string, any>) => {

    }

    const onPressProduct = (product: IProductModel) => router.push({ pathname: `runchit/inventory/${product.id}` })

    return (
        <Container px={8} fullscreen level={2}>
            <Div mb={8} px={8} flexDir='row' alignItems='center' style={{ gap: 8 }}>
                <SearchBar onSearch={onSearch} />
                <Pressable onPress={() => setIsGrid(!isGrid)}>
                    <Icon fontSize={30} name={isGrid ? "list" : "grid"} fontFamily='Entypo' />
                </Pressable>
            </Div>
            <ScrollDiv showsVerticalScrollIndicator={false}>
                <Div px={8} flexDir='row' w="100%" flexWrap='wrap' justifyContent='space-between'>
                    {
                        products.map((product, i) => (
                            isGrid
                                ? <ProductGrid product={product} index={i} onPress={() => onPressProduct(product)} key={i} />
                                : <ProductList product={product} index={i} onPress={() => onPressProduct(product)} key={i} />
                        ))
                    }
                </Div>

            </ScrollDiv>
            <Div shadow="md"
                zIndex={2}
                position='absolute'
                bottom={25}
                right={25}>
                <Link asChild href="/runchit/modal/create_product">
                    <Button
                        rounded="circle"
                        w={60}
                        h={60}
                        bg='indigo600'
                    >
                        <Icon fontSize={24} color='#fff' name='plus' />
                    </Button>
                </Link>
            </Div>
        </Container>
    )
}

export default Inventory

const ProductGrid: React.FC<{ onPress?: () => void, index: number, product: IProductModel }> = ({ onPress, index, product }) => {
    const isLeft = index % 2 === 0
    return (
        <Pressable style={{ [`margin${isLeft ? "Right" : "Left"}`]: "1%", width: "48%", marginBottom: 16 }} onPress={onPress}>
            <Div h={250} bg='#fff' shadow="xs" rounded="lg">
                <Div bg='indigo600' roundedTop="lg" flex={20} alignItems='center' justifyContent='center'>
                    <Typography>image here</Typography>
                </Div>
                <Div flex={9} py={8} px={16} justifyContent='space-between'>
                    <Typography variant='s1'>{product.name}</Typography>
                    <Div flexDir='row' justifyContent='space-between'>
                        <Typography>{`RM ${(product.unitPrice ?? 0).toFixed(2)}`}</Typography>
                        <Typography>{product.shelfQuantity ?? 0} unit</Typography>
                    </Div>
                </Div>
            </Div>
        </Pressable>
    )
}

const ProductList: React.FC<{ onPress?: () => void, index: number, product: IProductModel }> = ({ onPress, index, product }) => {
    return (
        <Div flexDir='row' w="100%" bg='#fff' rounded="lg" shadow="xs" mt={8}>
            <Div bg='indigo600' roundedLeft="lg" alignItems='center' justifyContent='center'>
                <Typography>image here</Typography></Div>
            <Div flex={1} p={8} style={{ gap: 4 }}>
                <Typography variant='s1'>{product.name}</Typography>
                <Typography >{product.sku ?? ""}</Typography>
                <Div flexDir='row' justifyContent='space-between'>
                    <Typography>RM{product.unitPrice ?? "0.00"}</Typography>
                    <Typography>{product.shelfQuantity} unit</Typography>
                </Div>
            </Div>
        </Div>
    )
}

const SearchBar: React.FC<{ onSearch: (data: Record<string, any>) => void }> = ({ onSearch }) => {
    const [searchFocus, setSearchFocus] = React.useState(false)

    return (
        <Div flex={1}>
            <Input

                fontSize={14}
                returnKeyType='search'
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                suffix={
                    <Pressable onPress={() => console.log("search qr")}>
                        <Div flexDir='row' alignItems='center'>
                            {searchFocus &&
                                <Typography variant='s2' mr={8} color='gray400'>Scan QR</Typography>
                            }
                            <Icon fontSize={20} name='ios-qr-code' fontFamily='Ionicons' />
                        </Div>
                    </Pressable>}
                placeholder='Search products'
            />
        </Div>
    )
}
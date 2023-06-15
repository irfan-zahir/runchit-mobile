import { fetchProductSkuAPI } from '@api/product.api'
import { Container } from '@components/container'
import { SkuScanner } from '@components/scanner'
import { Typography } from '@components/typography'
import { IProductModel } from '@typings/models'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React from 'react'
import { Button, Div, Icon, Modal, Skeleton } from 'react-native-magnus'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface IFabScannerParams extends Record<string, any> {
    hook_path?: string;
    formValues?: string
}

export default function Fab() {

    const router = useRouter()
    const params = useLocalSearchParams<IFabScannerParams>()

    const [loading, setloading] = React.useState(false)
    const [scannedCode, setScannedCode] = React.useState<string | null>(null)
    const [scannedProduct, setScannedProduct] = React.useState<IProductModel[] | null>(null)
    const [notFound, setNotFound] = React.useState(false)

    const bottomSliverHeight = useSharedValue(0)
    const expandAnimation = useAnimatedStyle(() => {
        const expandedValue = interpolate(bottomSliverHeight.value, [0, 1, 2], [0, 50, 100])
        return {
            height: withTiming(`${expandedValue}%`, { duration: 300 })
        }
    })

    const onScannedCode = async () => {
        if (scannedCode !== null) {
            if (typeof params.hook_path === "string" && typeof params.formValues === "string") {
                return router.replace({
                    pathname: params.hook_path,
                    params: { formValues: JSON.stringify({ ...JSON.parse(params.formValues), sku: scannedCode }) }
                })
            }

            bottomSliverHeight.value = 1
            fetchProductSkuAPI({ sku: scannedCode })
                .then(data => {
                    setloading(false)
                    if (data.length === 0) return setNotFound(true)
                    if (scannedProduct === null) return setScannedProduct(data)
                    setScannedProduct([...data, ...scannedProduct])
                })
        } else {
            bottomSliverHeight.value = 0
        }
    }

    React.useEffect(() => {
        onScannedCode()
        return () => { }
    }, [scannedCode])

    const onContainerMove = (posY: number) => {
        if (posY < 0 && bottomSliverHeight.value === 1) return bottomSliverHeight.value = 2
        if (posY > 0 && bottomSliverHeight.value === 2) return bottomSliverHeight.value = 1
    }

    return (
        <Div w="100%" h="100%" onTouchMove={(e) => onContainerMove(e.nativeEvent.locationY)}>
            <Div flex={1}>
                {
                    !scannedCode && <SkuScanner flex={1} onScanned={(value) => { setScannedCode(value); setloading(true); }} />
                }
            </Div>
            <Animated.View style={{ ...expandAnimation }}>
                <Container
                    flex={1}
                    safeBottom={(notFound || scannedProduct !== null)}
                    bg='#fff'
                    roundedTop="2xl">
                    <Div h="100%">
                        <Div my={10} w={40} h={7} rounded={12} alignSelf='center' bg='gray200' />

                        <Typography mb={8} bg='transparent' variant='h6' color='indigo600'>
                            Scan product
                        </Typography>
                        <Div flex={1}>
                            {
                                (notFound && scannedCode) && <ProductNotFound sku={scannedCode} scanOther={() => { setScannedCode(null); setNotFound(false) }} />
                            }
                            {
                                loading
                                    ? <SkeletonProduct />
                                    : scannedProduct && scannedProduct.map((product, i) => <ProductCard key={i} product={product} />)
                            }
                        </Div>
                        {
                            (scannedProduct && scannedProduct.length === 1) &&
                            (
                                <Div mt={8} flexDir='row' justifyContent='space-between'>
                                    <Link href={{
                                        params: { product: scannedProduct && scannedProduct[0] },
                                        pathname: "/runchit/modal/update_product"
                                    }} asChild>
                                        <Button px={24} bg='teal400' rounded="circle">
                                            <Typography color='#fff' variant='s2'>Update product</Typography>
                                        </Button></Link>
                                    <Button px={24} bg='indigo400' rounded="circle">
                                        <Typography color='#fff' variant='s2'>Scan more</Typography>
                                    </Button>
                                </Div>
                            )
                        }
                    </Div>
                </Container>
            </Animated.View>
        </Div>
    )
}

const ProductNotFound: React.FC<{ sku: string, scanOther: () => void }> = ({ sku, scanOther }) => {
    const router = useRouter()
    const goCreateProduct = () => router.replace({ pathname: "/runchit/modal/create_product", params: { sku } })
    return (
        <Div shadow="sm" p={8} bg='#fff' rounded="md">
            <Typography variant='s2' >No product registered with this SKU number found.</Typography>
            <Typography variant='c1' color='gray700'>You can create product with this sku or scan for other product.</Typography>
            <Div mt={16} flexDir='row' justifyContent='space-between'>
                <Button px={24} bg='teal400' rounded="md" onPress={goCreateProduct}>
                    <Typography color='#fff' variant='s2'>Create product</Typography>
                </Button>
                <Button px={24} bg='indigo400' rounded="md" onPress={scanOther}>
                    <Typography color='#fff' variant='s2'>Scan other</Typography>
                </Button>
            </Div>
        </Div>
    )
}

const ProductCard: React.FC<{ product: IProductModel }> = ({ product }) => {
    return (
        <Div flexDir='row'>
            {/* <Skeleton.Box w={75} h={75} mr={16} /> */}
            <Div bg='indigo100' w={75} h={75} mr={16}><Typography>image here</Typography></Div>
            <Div flex={1} justifyContent='space-between'>
                <Typography variant='h6'>Item name</Typography>
                {/* <Typography>{product.sku}</Typography> */}
                <Skeleton.Box w="80%" />
                <Skeleton.Box w="50%" />
            </Div>
        </Div>
    )
}

const SkeletonProduct = () => {
    return (
        <Div flexDir='row' mt={16}>
            <Skeleton.Box w={75} h={75} mr={16} />
            <Div flex={1} justifyContent='space-between'>
                <Skeleton.Box h={35} />
                <Skeleton.Box w="80%" />
                <Skeleton.Box w="50%" />
            </Div>
        </Div>
    )
}
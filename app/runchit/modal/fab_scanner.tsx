import { fetchProductSkuAPI } from '@api/product.api'
import { Container } from '@components/container'
import { Image } from '@components/image'
import { SkuScanner } from '@components/scanner'
import { Typography } from '@components/typography'
import { useNavigation } from '@react-navigation/native'
import { IProductModel } from '@typings/models'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { Badge, Button, Div, Icon, Modal, Skeleton } from 'react-native-magnus'
import { OnSwipeCompleteParams } from 'react-native-modal'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface IFabScannerParams extends Record<string, any> {
    hook_path?: string;
    formValues?: string
}

export default function Fab() {

    const navigation = useNavigation()
    const router = useRouter()
    const params = useLocalSearchParams<IFabScannerParams>()

    const [loading, setloading] = React.useState(false)
    const [scannedCode, setScannedCode] = React.useState<string | null>(null)
    const [scannedProduct, setScannedProduct] = React.useState<IProductModel[] | null>(null)
    const [notFound, setNotFound] = React.useState(false)

    const [showModal, setshowModal] = React.useState<boolean | null>(false)

    const bottomSliverHeight = useSharedValue(0)
    const expandAnimation = useAnimatedStyle(() => {
        const expandedValue = interpolate(bottomSliverHeight.value, [0, 1], [50, 100])
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

            setshowModal(true)
            fetchProductSkuAPI({ sku: scannedCode })
                .then(data => {
                    setloading(false)
                    if (data.length === 0) return setNotFound(true)
                    if (scannedProduct === null) return setScannedProduct(data)
                    setScannedProduct([...data, ...scannedProduct])
                })
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

    const scanMore = () => {
        setScannedCode(null)
        setshowModal(false)
    }

    const onExpandModal = ({ swipingDirection }: OnSwipeCompleteParams) => {
        if (swipingDirection === "up" && bottomSliverHeight.value === 0) return bottomSliverHeight.value = 1
        if (swipingDirection === "down" && bottomSliverHeight.value === 1) return bottomSliverHeight.value = 0
        if (swipingDirection === 'down' && bottomSliverHeight.value === 0) return setshowModal(false)
    }

    const scanOther = () => {
        setScannedCode(null);
        setNotFound(false)
        setshowModal(false)
    }

    return (
        <Div w="100%" h="100%">
            <Div flex={1}>
                {
                    showModal === false && <SkuScanner flex={1} onScanned={(value) => { setScannedCode(value); setloading(true); }} />
                }
            </Div>
            <Modal
                onSwipeComplete={onExpandModal}
                hasBackdrop={false}
                roundedTop="2xl" isVisible={!!showModal} h="50%" swipeDirection={["down", "up"]}>
                <Container
                    flex={1}
                    safeBottom={(notFound || scannedProduct !== null)}
                    bg='#fff'
                    roundedTop="2xl"
                >
                    <Div h="100%">
                        <Div my={10} w={40} h={7} rounded={12} alignSelf='center' bg='gray200' />

                        <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                            <Typography mb={8} bg='transparent' variant='h6' color='indigo600'>
                                Scan product
                            </Typography>
                            <Pressable onPress={() => scanMore()}>
                                <Div alignItems='center' flexDir='row' rounded="circle" px={16} py={4} bg='indigo600'>
                                    <Icon mr={8} fontSize={24} color='#fff' name='barcode-scan' fontFamily='MaterialCommunityIcons' />
                                    <Typography color='#fff' variant='s2'>Scan more</Typography>
                                </Div>
                            </Pressable>
                        </Div>
                        <Div flex={1}>
                            {
                                (notFound && scannedCode) && <ProductNotFound sku={scannedCode} scanOther={scanOther} />
                            }
                            {
                                loading
                                    ? <SkeletonProduct />
                                    : scannedProduct && scannedProduct.map((product, i) => <ProductCard key={i} product={product} updatable={true} />)
                            }
                        </Div>
                    </Div>
                </Container>
            </Modal>
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
                <Button px={24} bg='indigo600' rounded="md" onPress={scanOther}>
                    <Typography color='#fff' variant='s2'>Scan other</Typography>
                </Button>
            </Div>
        </Div>
    )
}

const ProductCard: React.FC<{ product: IProductModel, updatable?: boolean }> = ({ product, updatable }) => {
    return (
        <Div flexDir='row' mt={16}>
            <Image rounded="md" w={80} h={80} source={{ uri: product.images[0] }} />
            <Div ml={16} flex={1}>
                <Typography variant='s1'>{product.name}</Typography>
                <Typography >{product.sku ?? ""}</Typography>
                <Div flexDir='row' justifyContent='space-between'>
                    <Typography>RM{product.unitPrice ?? "0.00"}</Typography>
                    <Typography>{product.shelfQuantity} unit</Typography>
                </Div>
                {
                    updatable &&
                    <Link href={{
                        params: { product },
                        pathname: "/runchit/modal/update_product"
                    }} asChild>
                        <Button px={24} bg='teal400' rounded="md">
                            <Typography color='#fff' variant='s2'>Update product</Typography>
                        </Button>
                    </Link>
                }
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
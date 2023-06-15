import { deleteProductAPI, fetchUniqueProductAPI, updateProductAPI } from '@api/product.api'
import { Container } from '@components/container'
import { Form, useForm } from '@components/forms'
import { Input } from '@components/forms/input'
import { Typography } from '@components/typography'
import { IProductModel } from '@typings/models'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, ScrollView } from 'react-native'
import { Button, Div, Icon, Image, Modal } from 'react-native-magnus'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { appDispatch } from '@rtk/store'
import { updateProducts } from '@rtk/slices/products.slice'


interface IRouteParam extends Record<string, any> {
    productId: string
}

type IFormFields = Omit<IProductModel, "storeId" | "id">

function UpdateProduct() {
    const dispatch = appDispatch()
    const router = useRouter()
    const { productId } = useLocalSearchParams<IRouteParam>()
    const [product, setProduct] = React.useState<IProductModel | null>(null)
    const [loading, setLoading] = React.useState(true)

    const formRef = useForm<IFormFields>()

    React.useEffect(() => {
        if (product === null && productId) fetchUniqueProductAPI(productId).then(product => { setProduct(product); setLoading(false) })

        return () => { }
    }, [])

    const onSubmitUpdate = (data: IFormFields) => {
        setLoading(true)
        if (product && productId)
            updateProductAPI({ ...product, ...data, id: productId }).then(newProduct => {
                setProduct(newProduct)
                dispatch(updateProducts(newProduct))
                setLoading(false)
            })
    }

    const deleteProduct = () => {
        setLoading(true)
        deleteProductAPI(product!.id).then(_ => router.replace({ pathname: "runchit/inventory" }))
    }

    return (
        <>
            <Form<IFormFields> ref={formRef} onSubmit={onSubmitUpdate} defaultValues={product!}>
                <Div flex={1} bg='level2'>
                    <KeyboardAwareScrollView>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ padding: 16, flexGrow: 0, width: "100%" }}>
                            {
                                // product && product.images
                                Array(3).fill(0).map((image, i) => (
                                    <Pressable key={i}>
                                        <Div mr={8} shadow="sm" rounded="md" bg='#fff'>
                                            <Image resizeMode='cover' rounded="md" h={175} w={250} source={{ uri: "https://images.pexels.com/photos/279480/pexels-photo-279480.jpeg" }} />
                                        </Div>
                                    </Pressable>
                                ))
                            }
                            <Pressable>
                                <Div p={24} mr={24} bg='#fff' shadow="sm" rounded="md" h={175} w={250} alignItems='center' justifyContent='center'>
                                    <Icon name='image-plus' mr={8} fontFamily='MaterialCommunityIcons' fontSize={50} color='indigo600' />
                                    <Typography mt={8}>Add image</Typography>
                                </Div>
                            </Pressable>
                        </ScrollView>
                        <Container flex={1} level={2}>
                            <Input
                                loading={loading}
                                required
                                name='name'
                                placeholder='Product name'
                                defaultValue={product?.name}
                            />

                            <Input
                                loading={loading}
                                scanQR
                                name='sku'
                                placeholder='Product SKU'
                                defaultValue={product?.sku}
                            />

                            <Input
                                loading={loading}
                                name='shelfQuantity'
                                keyboardType='decimal-pad'
                                placeholder='Quantity available on shelf'
                                defaultValue={product?.shelfQuantity}
                            />

                            <Input
                                loading={loading}
                                name='unit_name'
                                placeholder='Unit (default: unit)'
                                defaultValue={product?.unit_name}
                            />

                            <Input
                                prefix={<Typography>RM</Typography>}
                                loading={loading}
                                name='unitPrice'
                                placeholder='Price per unit'
                                defaultValue={product?.unitPrice?.toFixed(2)}
                            />

                            <Input
                                loading={loading}
                                name='storageQuantity'
                                placeholder='Quantity available in storage'
                                defaultValue={product?.storageQuantity}
                            />

                            <Input
                                loading={loading}
                                name='purchase'
                                prefix={<Typography>RM</Typography>}
                                placeholder='Purchase price per unit'
                                defaultValue={product?.purchase?.toFixed(2)}
                            />

                            <Button
                                block
                                disabled={loading}
                                bg='indigo600'
                                prefix={loading && <ActivityIndicator size="small" style={{ marginEnd: 16 }} color="#fff" />}
                                onPress={() => formRef.current?.submit && formRef.current.submit()}>
                                <Typography variant='s2' color='#fff'>Submit</Typography>
                            </Button>
                            <Button
                                mt={8}
                                block
                                disabled={loading}
                                onPress={deleteProduct}
                                bg='red600'>
                                <Typography variant='s2' color='#fff'>Delete</Typography>
                            </Button>
                        </Container>
                    </KeyboardAwareScrollView>
                </Div>
            </Form>
            <Modal>

            </Modal>
        </>
    )
}

export default UpdateProduct
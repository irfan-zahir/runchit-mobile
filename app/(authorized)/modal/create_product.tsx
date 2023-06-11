import { Container } from '@components/container'
import { Typography } from '@components/typography'
import React from 'react'
import { Badge, Button, Checkbox, Div, DivProps, Icon, Modal } from 'react-native-magnus'
import { KeyboardAvoidingView, Pressable, ScrollView, Touchable, View } from 'react-native'
import { Input } from '@components/forms/input'
import { Form, useForm } from '@components/forms'
import PagerView from 'react-native-pager-view'
import { Link, useRootNavigation } from 'expo-router'
import { Ticker } from '@components/ticker'
import { createProductAPI } from '@api/product.api'
import { appDispatch } from '@rtk/store'

interface IFormProductFields {
    name: string
    purchase?: number
    unitPrice?: number
    sku?: string
    storageQuantity?: number
    shelfQuantity?: number
    storeId: string
}

function CreateProduct() {
    const dispatch = appDispatch()
    const formRef = useForm<IFormProductFields>()

    const onSubmit = async (data: IFormProductFields) =>
        createProductAPI(data).then((product) => { })

    const pagerRef = React.useRef<PagerView>(null)

    const onPageSelected = (selectedPage: number) => {
        setPage(selectedPage)
    }

    const [modalVisible, setModalVisible] = React.useState(true)
    const navigation = useRootNavigation()

    const skuRef = React.useRef(null)
    const [page, setPage] = React.useState(0)

    return (
        <Modal avoidKeyboard isVisible={modalVisible} hasBackdrop={false} bg='transparent'>
            <Container position='absolute' left={0} right={0} bottom={0} h="65%" alignItems='center' roundedTop="36">
                <Div justifyContent='space-between' flexWrap='wrap' flexDir='row' px={16} my={16}>
                    <Div flex={1}>
                        <Typography variant='s1' color='indigo600'>Register Product</Typography>
                        <Typography variant='p2' textBreakStrategy='balanced'>Register new product record that are available in your inventory. </Typography>
                    </Div>
                    <Div>
                        <Link href={{ pathname: "app/inventory", params: { refresh: false } }} asChild>
                            <Pressable>
                                <Badge bg='gray500' shadow="xs" px={8}>Cancel</Badge>
                            </Pressable></Link>
                    </Div>
                </Div>
                <Div w="100%" shadow="xs" flexDir='row' justifyContent='space-between' px={16} my={4}>
                    <Ticker pages={3} currentPage={page} />
                    <Button
                        bg='indigo600' px={20} rounded="circle" py={8}
                        onPress={() => formRef.current?.submit && formRef.current?.submit()}>
                        <Typography variant='c2' color='#fff'>
                            Submit
                        </Typography>
                    </Button>
                </Div>
                <Div mt={8} px={8} w="100%" flex={1} alignItems='center' justifyContent='center'>
                    <Form onSubmit={onSubmit} ref={formRef}>
                        <PagerView
                            overScrollMode="always"
                            ref={pagerRef}
                            initialPage={0}
                            onPageSelected={(e) => onPageSelected(e.nativeEvent.position)}
                            style={{ flex: 1, width: "100%", }}>
                            <Div key={1} flex={1} px={8} >
                                <Input
                                    required
                                    name='name'
                                    placeholder='Product name'
                                    nextRef={skuRef}
                                />
                                <Input
                                    innerRef={skuRef}
                                    scanQR
                                    name='sku'
                                    placeholder='Product SKU'
                                />
                            </Div>
                            <Div key={2} flex={1} px={8} >
                                <ScrollView style={{ flex: 1, }}>
                                    <Input
                                        name='shelfQuantity'
                                        keyboardType='decimal-pad'
                                        placeholder='Quantity available on shelf'
                                    />
                                    <Input
                                        name='unit'
                                        placeholder='Unit (default: unit)'
                                    />
                                    <Input
                                        name='unitPrice'
                                        placeholder='Price per unit'
                                    />
                                </ScrollView>
                            </Div>
                            <Div key={3} flex={1} px={8} >
                                <Input
                                    name='storageQuantity'
                                    placeholder='Quantity available in storage'
                                />

                                <Input
                                    name='purchase'
                                    placeholder='Purchase price per unit'
                                />
                            </Div>
                        </PagerView>
                    </Form>
                </Div>
            </Container>
        </Modal>
    )
}

export default CreateProduct
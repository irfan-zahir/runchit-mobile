import { Button } from '@components/button'
import { Form, FormInput, useForm } from '@components/forms'
import { Modal } from '@components/modal'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import CreatePackage from '@svgs/CreatePackage'
import React from 'react'
import { Div, Icon, Select, SelectRef } from 'react-native-magnus'
import { Pressable, ScrollView } from "react-native"
import { SkuScanner } from './SkuScanner'
import { MultiInputWrapper } from '@components/forms'
import { createProductAPI } from '@api/product.api'
import { appDispatch } from '@rtk/store'
import { addProduct } from '@rtk/slices/products.slice'
import { productScalarUnit } from '@constants/scalarUnits.constant'

type IFormAttributes = { name: string; value: string }
interface FormSchema {
    name: string;
    sku: string;
    purchase: string;
    sellPrice: string;
    quantity: number;
    unit: string;
}

export const CreateInventory = () => {
    const dispatch = appDispatch()

    const [loading, setLoading] = React.useState(false)
    const { modalRef, openModal, closeModal } = useModal()
    const [showScanner, setShowScanner] = React.useState(false)
    const formRef = useForm<FormSchema>()

    const RMPrefix = () => <Typography>RM</Typography>

    const SkuSuffix = () => {
        return (
            <Pressable onPress={() => setShowScanner(true)}>
                <Icon name='barcode-outline' fontSize={24} color="primary" fontFamily='Ionicons' />
            </Pressable>
        )
    }

    const UnitSuffix = React.memo(props => {

        const { openModal: openSelect, isVisible, closeModal: closeSelect } = useModal()
        const [unit, setUnit] = React.useState(productScalarUnit[0])
        const onSelect = (value: string) => {
            formRef.current && formRef.current.setValue("unit", value)
            setUnit(value)
            closeSelect()
        }

        return (
            <>
                <Pressable onPress={() => openSelect()}>
                    <Typography variant='subtitle' color='primary'>{unit}</Typography>
                </Pressable>
                <Modal closeOnPressBackdrop isVisible={isVisible} h="25%" rounded="2xl" p={16} >
                    {
                        productScalarUnit.map((item, i) => (
                            <Pressable style={{ width: "100%", marginBottom: 16 }} key={i} onPress={() => onSelect(item)}>
                                <Div flexDir='row'>
                                    <Icon
                                        mr={8}
                                        name='check-circle'
                                        fontFamily='Feather'
                                        fontSize={18}
                                        color={item === unit ? "success" : "transparent"}
                                    />
                                    <Typography variant='subtitle'>{item}</Typography>
                                </Div>
                            </Pressable>
                        ))
                    }
                </Modal>
            </>
        )
    })

    const onSkuScanned = (scannedData: string) => {
        formRef.current?.setValue("sku", scannedData)
        setShowScanner(false)
    }

    const onSubmit = async ({ quantity, ...formData }: FormSchema) => {
        setLoading(true)
        const createdProduct = await createProductAPI({ product: { ...formData, unit: formData.unit ?? "unit", quantity: quantity ?? 0 } })
        if (!createdProduct.error) {
            dispatch(addProduct(createdProduct.product))
            setLoading(false)
            closeModal()
        }
    }

    return (
        <>
            <Button
                borderless
                shadow="md"
                rounded="circle"
                position='absolute' bottom={25} right={25}
                onPress={() => openModal()}
            >
                <CreatePackage />
            </Button>
            <Modal
                h="65%"
                py={16}
                avoidKeyboard
                roundedTop="2xl"
                modalRef={modalRef}
                onDismiss={() => showScanner && setShowScanner(false)} >
                <ScrollView>
                    <Div flex={1} px={16}>
                        <Div flexDir='row' justifyContent='space-between' mb={16}>
                            <Typography color='primary' variant='title'>Create Product</Typography>
                        </Div>
                        <Form<FormSchema> ref={formRef} onSubmit={onSubmit} >
                            <FormInput required name='name' label='Product name' />
                            {
                                !showScanner
                                    ? <FormInput suffix={<SkuSuffix />} label='Product SKU' name='sku' />
                                    : <Div my={4}>
                                        <Typography color='primary' variant='subtitle' mb={4}>
                                            Scan SKU
                                        </Typography>
                                        <SkuScanner onScanned={onSkuScanned} onCancelScan={() => setShowScanner(false)} />
                                    </Div>
                            }
                            <FormInput name='quantity' label='Product quantity' suffix={<UnitSuffix />} />
                            <FormInput required name='purchase' label='Purchase price per unit' prefix={<RMPrefix />} keyboardType='decimal-pad' />
                            <FormInput required name='sellPrice' label='Selling price per unit' prefix={<RMPrefix />} keyboardType='decimal-pad' />
                        </Form>
                        <Button mt={16} block disabled={showScanner || loading} onPress={() => !showScanner && formRef.current?.submit && formRef.current?.submit()}>
                            Submit
                        </Button>
                        <Button mt={4} block onPress={() => closeModal()} bg='grey'>
                            Back
                        </Button>
                    </Div>
                </ScrollView>
            </Modal>
        </>
    )
}

import { Button } from '@components/button'
import { Form, FormInput, useForm } from '@components/forms'
import { Modal } from '@components/modal'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import CreatePackage from '@svgs/CreatePackage'
import React from 'react'
import { Div, Icon } from 'react-native-magnus'
import { Pressable, ScrollView } from "react-native"
import { SkuScanner } from './SkuScanner'
import { MultiInputWrapper } from '@components/forms'

interface FormSchema {
    name: string;
    sku: string;
}

export const CreateInventory = () => {
    const { modalRef, openModal, closeModal } = useModal()
    const [showScanner, setShowScanner] = React.useState(false)
    const formRef = useForm<FormSchema>()

    const SkuSuffix = () => {
        return (
            <Pressable onPress={() => setShowScanner(true)}>
                <Icon name='barcode-outline' fontSize={24} color="primary" fontFamily='Ionicons' />
            </Pressable>
        )
    }

    const onSkuScanned = (scannedData: string) => {
        formRef.current?.setValue("sku", scannedData)
        setShowScanner(false)
    }

    return (
        <>
            <Button
                borderless
                shadow="md"
                rounded="circle"
                position='absolute' bottom={50} right={25}
                onPress={() => openModal()}
            >
                <CreatePackage />
            </Button>
            <Modal py={16} avoidKeyboard modalRef={modalRef} roundedTop="2xl" h="65%" onDismiss={() => showScanner && setShowScanner(false)} >
                <ScrollView>
                    <Div flex={1} px={16}>
                        <Typography color='primary' variant='title'>Create Product</Typography>
                        <Form<FormSchema> ref={formRef} onSubmit={(formData) => console.log({ formData })} >
                            {
                                !showScanner
                                    ? <FormInput required suffix={<SkuSuffix />} label='Product SKU' name='sku' />
                                    : <Div my={4}>
                                        <Typography color='primary' variant='subtitle' mb={4}>
                                        Scan SKU
                                        </Typography>
                                        <SkuScanner onScanned={onSkuScanned} />
                                    </Div>
                            }
                            <FormInput required name='name' label='Product name' />
                            <FormInput required name='price' label='Product price' keyboardType='decimal-pad' />
                            <FormInput name='storage' label='Quantity added to storage' keyboardType='decimal-pad' />
                            <MultiInputWrapper mt={16} label='Product Attributes' name='attributes'>
                                <FormInput name='name' label='Attiribute name (e.g: Color, Size, Weight)' />
                                <FormInput name='value' label='Attribute value' />
                            </MultiInputWrapper>
                            <FormInput name='supplier' label='Product supplier' />
                        </Form>
                        <Button mt={16} block onPress={() => formRef.current?.submit && formRef.current?.submit()}>
                            Submit
                        </Button>
                        <Button mt={4} block onPress={()=>closeModal()} bg='grey'>
                            Back
                        </Button>
                    </Div>
                </ScrollView>
            </Modal>
        </>
    )
}

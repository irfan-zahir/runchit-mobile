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
            <Modal modalRef={modalRef} rounded="2xl" h="65%" onDismiss={() => showScanner && setShowScanner(false)} >
                <ScrollView style={{ marginTop: 24 }}>
                    <Div flex={1} px={16}>
                        <Typography color='primary' variant='title'>Create Product</Typography>
                        <Form<FormSchema> ref={formRef} onSubmit={(formData) => console.log({ formData })} >
                            {
                                !showScanner
                                    ? <FormInput suffix={<SkuSuffix />} label='Product SKU' name='sku' />
                                    : <SkuScanner onScanned={onSkuScanned} />
                            }
                        </Form>
                        <Button block onPress={() => formRef.current?.submit && formRef.current?.submit()}>
                            Submit
                        </Button>
                    </Div>
                </ScrollView>
            </Modal>
        </>
    )
}

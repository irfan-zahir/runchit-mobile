import { createStoreAPI } from '@api/store.api';
import { Button } from '@components/button'
import { Form, FormInput, useForm } from '@components/forms';
import { MultiInputWrapper } from '@components/forms/multi/MultiInput';
import { Typography } from '@components/typography'
import { selectUserStore } from '@rtk/selectors/store.selector';
import { setCurrentStore, setStores } from '@rtk/slices/store.slice';
import { appDispatch, selector } from '@rtk/store';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Div, Icon, Modal } from 'react-native-magnus'


interface ISwitchStoreModalProps {
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}


interface IShopsSchema {
    name: string;
    address: string
}

interface FormSchema {
    stores: IShopsSchema[]
}

export const SwitchStoreModal = ({ isVisible, closeModal }: ISwitchStoreModalProps) => {
    const { currentStore, stores } = selector(selectUserStore)

    const [addStore, setAddStore] = React.useState(false)
    const [deleteStore, setDeleteStore] = React.useState<number | false>(false)
    const formRef = useForm<FormSchema>()
    const submitForm = formRef!.current?.submit

    const dispatch = appDispatch()

    const onSubmit = async (formData: FormSchema) => {
        const allStores = await createStoreAPI(formData)
        if (!allStores.error) {
            dispatch(setStores(allStores.stores))
            setAddStore(false)
        }
    }

    const switchStore = (index: number) => {
        dispatch(setCurrentStore(stores[index]))
        closeModal()
    }

    return (

        <Modal avoidKeyboard isVisible={isVisible} h="50%%" rounded="2xl" p="lg" onBackdropPress={() => (!addStore && !deleteStore) && closeModal()}>
            <ScrollView contentContainerStyle={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }} >
                <Div flex={1}>
                    {
                        (addStore || deleteStore) &&
                        <Button block variant="bare" bg="primary" mb="md" px={0} py={8}
                            flexDir='row' justifyContent='flex-start'
                            onPress={() => {
                                addStore && setAddStore(false)
                                deleteStore && setDeleteStore(false)
                            }}
                            prefix={<Icon name="arrow-back-ios" fontFamily='MaterialIcons' mr="sm" color="primary" fontSize="caption" />}>
                            Return
                        </Button>
                    }
                    {
                        (!addStore && !deleteStore) &&
                        <Div>
                            {
                                stores.map((store, i) => {
                                    const selected = store.id === currentStore?.id
                                    return (
                                        <Div flexDir='row' alignItems='center' justifyContent='space-between' flex={1} key={i}>
                                            <Button
                                                flex={1}
                                                key={i}
                                                onPress={() => switchStore(i)}
                                                variant={selected ? "solid" : "bare"} bg="primary" mb="md"
                                            >
                                                <Typography flex={1} color={selected ? "white" : "primary"}>
                                                    {store.name}
                                                </Typography>
                                            </Button>
                                            {
                                                !selected &&
                                                <Button onPress={() => setDeleteStore(i + 1)} variant='bare' p={4}>
                                                    <Icon name="delete" mr="sm" color="danger" fontFamily='MaterialIcons' fontSize="2xl" />
                                                </Button>
                                            }
                                        </Div>
                                    )
                                })
                            }
                        </Div>
                    }

                    {
                        addStore &&
                        <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                            <MultiInputWrapper name='stores'>
                                <FormInput required name="name" label='Shop Name' keyboardType='default' returnKeyType='done' />
                                <FormInput multiline numberOfLines={3} name="address" label='Shop Adress' keyboardType='default' returnKeyType='default' />
                            </MultiInputWrapper>
                        </Form>
                    }
                    {
                        deleteStore &&
                        <Div flex={1} justifyContent="space-between" py="md">
                            <Div>
                                <Typography variant='title' color='danger'>Confirm to delete {stores[deleteStore - 1].name}?</Typography>
                                <Typography>All data related to the store will be deleted</Typography>
                            </Div>

                            <Button
                                block
                                bg='danger'>
                                Delete
                            </Button>
                        </Div>
                    }
                </Div>
                {
                    !deleteStore &&
                    <Div>

                        <Button block variant="ghost" bg="secondary" mb="md"
                            onPress={() => !addStore ? setAddStore(true) : (submitForm && submitForm())}
                            prefix={<Icon name="pluscircleo" mr="sm" color="secondary" fontSize="caption" />}>
                            Add Store
                        </Button>
                    </Div>
                }
            </ScrollView>
        </Modal>
    )
}

import { registerOwner } from '@api/user.api';
import { Button } from '@components/button';
import { Form, FormInput, useForm } from '@components/forms';
import { MultiInputWrapper } from '@components/forms/multi/MultiInput';
import { Typography } from '@components/typography'
import { setCurrentStore } from '@rtk/slices/store.slice';
import { appDispatch } from '@rtk/store';
import { AuthenticatedScreenProps } from '@typings/navigation.d';
import React from 'react'
import { Div } from "react-native-magnus"

interface IShopsSchema {
    name: string;
    address: string
}

interface FormSchema {
    fullName: string;
    shops: IShopsSchema[]
}

export const Registration = ({ navigation }: AuthenticatedScreenProps<"Registration">) => {

    const formRef = useForm<FormSchema>()
    const submitForm = formRef.current?.submit
    const dispatch = appDispatch()

    const onSubmit = async (formData: FormSchema) => registerOwner(formData)
        .then(({ stores }) => {
            dispatch(setCurrentStore(stores[0]))
            navigation.navigate("Home")
        })
        .catch(e => console.error("Unexpected error occured while registering. ", e))

    return (
        <Div flex={1} alignItems="center">
            <Typography variant='subheading' color='primary' mb={16}>Register with Runchit.</Typography>
            <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                <FormInput required name="fullName" label='Full Name' keyboardType='default' returnKeyType='done' />
                <MultiInputWrapper mb={24} mt={16} name='shops'>
                    <FormInput required name="name" label='Shop Name' keyboardType='default' returnKeyType='done' />
                    <FormInput multiline numberOfLines={3} name="address" label='Shop Adress' keyboardType='default' returnKeyType='default' />
                </MultiInputWrapper>
            </Form>

            <Button onPress={() => submitForm && submitForm()} block>Submit</Button>
        </Div>
    )
}

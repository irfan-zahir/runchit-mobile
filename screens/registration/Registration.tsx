import { registerOwner } from '@api/user.api';
import { Button } from '@components/button';
import { Form, FormInput, useForm, MultiInputWrapper } from '@components/forms';
import { Typography } from '@components/typography'
import { setCurrentUser } from '@rtk/slices/currentUser.slice';
import { setCurrentStore, setStores } from '@rtk/slices/store.slice';
import { appDispatch } from '@rtk/store';
import { AuthenticatedScreenProps } from '@typings/navigation.d';
import React from 'react'
import { Div } from "react-native-magnus"
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

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
    const dispatch = appDispatch()

    const onSubmit = async (formData: FormSchema) => registerOwner(formData)
        .then(({ stores, user }) => {
            dispatch(setCurrentUser(user))
            dispatch(setStores(stores))
            dispatch(setCurrentStore(stores[0]))
            navigation.navigate("Home")
        })
        .catch(e => console.error("Unexpected error occured while registering. ", e))

    return (
        <SafeAreaInsetsContext.Consumer>
            {
                insets => (
                    <Div flex={1} alignItems="center" mt={24} pt={insets?.top} px={16}>
                        <Typography variant='subheading' color='primary' mb={16}>Register with Runchit.</Typography>
                        <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                            <FormInput required name="fullName" label='Full Name' keyboardType='default' returnKeyType='done' />
                            <MultiInputWrapper mb={24} mt={16} name='shops'>
                                <FormInput required name="name" label='Shop Name' keyboardType='default' returnKeyType='done' />
                                <FormInput multiline numberOfLines={3} name="address" label='Shop Adress' keyboardType='default' returnKeyType='default' />
                            </MultiInputWrapper>
                        </Form>

                        <Button onPress={() => formRef.current?.submit && formRef.current?.submit()} block>Submit</Button>
                    </Div>
                )
            }
        </SafeAreaInsetsContext.Consumer>
    )
}

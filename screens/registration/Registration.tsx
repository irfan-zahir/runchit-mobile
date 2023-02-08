import { Button } from '@components/button';
import { Form, FormInput, useForm } from '@components/forms';
import { MultiInputWrapper } from '@components/forms/multi/MultiInput';
import { Typography } from '@components/typography'
import axios from 'axios';
import React from 'react'
import { Div, Input } from "react-native-magnus"

interface IShopsSchema {
    name: string;
    address: string
}

interface FormSchema {
    fullName: string;
    shops: IShopsSchema
}

export const Registration = () => {

    const formRef = useForm()

    const onSubmit = async (formData: FormSchema) => {
        console.log(formData)
        const res = await axios.post("/user/registration", formData)
        console.log(res.data)
    }

    return (
        <Div flex={1} alignItems="center">
            <Typography variant='subheading' color='primary' mb={16}>Register with Runchit.</Typography>
            <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                <FormInput required name="fullName" label='Full Name' keyboardType='default' returnKeyType='next' />
                <MultiInputWrapper mb={24} mt={16} name='shops'>
                    <FormInput required name="name" label='Shop Name' keyboardType='default' returnKeyType='next' />
                    <FormInput multiline numberOfLines={3} name="address" label='Shop Adress' keyboardType='default' returnKeyType='done' />
                </MultiInputWrapper>
            </Form>

            <Button onPress={() => formRef.current?.submit()} block>Submit</Button>
        </Div>
    )
}

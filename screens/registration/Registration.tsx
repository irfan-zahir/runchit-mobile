import { Button } from '@components/button';
import { Form, FormInput, useForm } from '@components/forms';
import { MultiInputWrapper } from '@components/forms/multi/MultiInput';
import { Typography } from '@components/typography'
import React from 'react'
import { Div } from "react-native-magnus"

interface FormSchema {
    fullName: string;
    shopName: string | string[];
    shopAddress: string | string[];

}

export const Registration = () => {

    const formRef = useForm()

    const onSubmit = (formData: FormSchema) => {
        console.log(formData)
    }

    return (
        <Div flex={1}>
            <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                <FormInput name="fullName" label='Full Name' keyboardType='default' returnKeyType='next' />
                <MultiInputWrapper label='Add Shops' name='shops'>
                    <FormInput name="shopName" label='Shop Name' keyboardType='default' returnKeyType='next' />
                    <FormInput name="shopAddress" label='Shop Adress' keyboardType='default' returnKeyType='done' />
                </MultiInputWrapper>
            </Form>
            <Button onPress={() => formRef.current?.submit()} block>Submit</Button>
        </Div>
    )
}

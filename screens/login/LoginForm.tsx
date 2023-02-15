import React from 'react'
import { Div, Modal } from "react-native-magnus"

import { app } from "@configs/firebase.config"
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import { Form, FormInput, useForm } from '@components/forms';

import { auth } from '@configs/firebase.config';
import { signInWithPhoneNumber } from "firebase/auth"
import { Button } from '@components/button';

interface ILoginFormProps { isModalVisible?: boolean; setModalVisible: any }

interface FormSchema {
    phoneNumber?: string
    verificationCode?: string
}

export const LoginForm = ({ isModalVisible, setModalVisible }: ILoginFormProps) => {

    const firebaseConfig = app.options
    const recaptchaVerifier = React.useRef<FirebaseRecaptchaVerifierModal>(null)

    const [verificationId, setVerificationId] = React.useState<string | null>(null)
    const formRef = useForm<FormSchema>()

    const login = async (phoneNumber: string) => {
        try {
            signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current!).then(confirm => {
                if (confirm) {
                    window.confirmationResult = confirm
                    setVerificationId(confirm.verificationId)
                }
            })

        } catch (error) {
            console.error("Error while login. Error: ", error)
        }
    }

    const verify = async (code: string) => {
        try {
            const confirmationResult = window.confirmationResult
            const result = await confirmationResult.confirm(code)
        } catch (error) {
            console.error("Error while login. Error: ", error)
        }

    }

    const onSubmit = async ({ phoneNumber, verificationCode }: FormSchema) => {
        if (typeof phoneNumber !== "undefined" && !verificationId) await login(`+6${phoneNumber}`)
        if (typeof verificationCode !== "undefined" && verificationId) await verify(verificationCode)
    }

    return (
        <>

            <Modal
                isVisible={isModalVisible}
                h="60%"
                rounded="2xl"
                p={16}>
                <FirebaseRecaptchaVerifierModal firebaseConfig={firebaseConfig} ref={recaptchaVerifier} attemptInvisibleVerification />
                <Div flex={1}>
                    <Form<FormSchema> ref={formRef} onSubmit={(data) => onSubmit(data)}>
                        {
                            !verificationId
                                ? <FormInput name="phoneNumber" label='Phone number' keyboardType='phone-pad' returnKeyType='done' />
                                : <FormInput name="verificationCode" label='Verification code' keyboardType='numeric' returnKeyType='done' />
                        }
                    </Form>
                </Div>
                <Button
                    block
                    onPress={() => formRef.current?.submit && formRef.current?.submit()}>
                    {!verificationId ? "Request TAC" : "Validate"}
                </Button>
                <Button
                    mt={8}
                    block
                    onPress={() => setModalVisible(false)}>
                    Back
                </Button>
            </Modal>
        </>
    )
}

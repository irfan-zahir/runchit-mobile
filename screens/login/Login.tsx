import React from 'react'
import { Div, Text, Button } from "react-native-magnus"

//@ts-ignore
import Flag from 'react-native-flags';
import { LoginForm } from './LoginForm';

export const Login = () => {

    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <>
            <LoginForm
                isModalVisible={modalVisible}
                setModalVisible={setModalVisible} />
            <Div flex={1} p={24} bg="white">
                <Div flex={3} alignItems="center" justifyContent='center'>
                    <Text>Welcome to Runchit</Text>
                </Div>
                <Div flex={1}>
                    <Button
                        block
                        onPress={() => setModalVisible(true)}
                        prefix={
                            <Flag
                                code="MY"
                                style={{ marginRight: 24 }}
                                size={32}
                                type="flat" />
                        }>
                        Enter your phone number
                    </Button>
                </Div>
            </Div >
        </>
    )
}

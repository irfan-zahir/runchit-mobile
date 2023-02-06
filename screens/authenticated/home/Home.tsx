import React from 'react'
import { Div, Button } from "react-native-magnus"
import { auth } from '@configs/firebase.config'
import { signOut } from "firebase/auth"
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Typography } from '@components/typography'
import axios from 'axios'

export const Home = (props: AuthenticatedScreenProps<"Home">) => {

    const apiTestCall = async () => {
        const response = await axios.get("/")
        console.log(response.data)
    }

    return (
        <Div flex={1}>
            <Typography>Home</Typography>
            <Div flex={1} alignItems="center" justifyContent='center'>
                <Button
                    block
                    onPress={() => signOut(auth)}
                >Logout</Button>

                <Button
                    mt={8}
                    block
                    onPress={() => apiTestCall()}
                >Calling to server</Button>
            </Div>
        </Div>
    )
}

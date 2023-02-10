import React from 'react'
import { Div, Button } from "react-native-magnus"
import { auth } from '@configs/firebase.config'
import { signOut } from "firebase/auth"
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Typography } from '@components/typography'
import axios from 'axios'
import { selector } from '@rtk/store'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'
import { selectUserStore } from '@rtk/selectors/store.selector'

export const Home = (props: AuthenticatedScreenProps<"Home">) => {

    const apiTestCall = async () => {
        const response = await axios.get("/user/")
        console.log(response.data)
    }

    const { userData } = selector(selectCurrentUser)
    const { currentStore, stores } = selector(selectUserStore)

    return (
        <Div flex={1}>
            <Typography>Home</Typography>
            <Div flex={1} alignItems="center" justifyContent='center'>
                <Typography>
                    {JSON.stringify(stores)}
                </Typography>
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

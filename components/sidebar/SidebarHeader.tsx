import React from 'react'
import { Avatar } from 'react-native-magnus'
import { selector } from '@rtk/store'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'
import { Link } from 'expo-router'
import { Container } from '..'

export const SidebarHeader: React.FC = () => {

    const { userData } = selector(selectCurrentUser)

    return (
        <>
            <Container safeTop level={2} flexDir='row' justifyContent='flex-end'>
                <Link href="/modal/profile">
                    <Avatar bg='indigo600' color='#fff' fontSize={18}>
                        {userData?.fullName[0]}
                    </Avatar>
                </Link>
            </Container>
        </>
    )
}

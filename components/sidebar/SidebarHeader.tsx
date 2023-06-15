import React from 'react'
import { Avatar } from 'react-native-magnus'
import { selector } from '@rtk/store'
import { selectUserState } from '@rtk/selectors/currentUser.selector'
import { Link } from 'expo-router'
import { Container } from '../container'

export const SidebarHeader: React.FC = () => {

    const currentUser = selector(selectUserState)

    return (
        <>
            <Container safeTop level={2} flexDir='row' justifyContent='flex-end'>
                <Link href="/runchit/modal/profile">
                    <Avatar bg='indigo600' color='#fff' fontSize={18}>
                        {currentUser && currentUser.userData?.fullName[0]}
                    </Avatar>
                </Link>
            </Container>
        </>
    )
}

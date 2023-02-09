import { Button } from '@components/button'
import { Typography } from '@components/typography'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'
import { selector } from '@rtk/store'
import React from 'react'
import { Avatar, Div } from 'react-native-magnus'

interface IDrawerHeaderProps {
    navigateToProfile: () => void
}

export const DrawerHeader = (props: IDrawerHeaderProps) => {

    const { userData } = selector(selectCurrentUser)

    const avatar = userData!.fullName[0] ?? "A"

    return (
        <Div flex={1} p={8} bg="primary" justifyContent='space-between'>
            <Div flexDir='row' alignItems='flex-end'>
                <Avatar bg='secondary' color='gray400'>{avatar}</Avatar>
                <Button ms="md" variant='bare' flexDir='column' alignItems='flex-start' p={4}>
                    <Typography variant='subtitle' color='gray400' mb={4}>Hello, {userData!.fullName}!</Typography>
                    <Typography variant='body' color='white'>
                        Owner
                    </Typography>
                </Button>
            </Div>

            <Button>
                <Typography variant='subtitle' color='secondary'>Runchit</Typography>
            </Button>
        </Div>
    )
}

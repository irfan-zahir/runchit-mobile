import { Container } from '@components/container'
import { FabScanner } from '@components/scanner'
import { Typography } from '@components/typography'
import { setVisibleModal } from '@rtk/slices/sidebar.slice'
import { appDispatch } from '@rtk/store'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Button } from 'react-native-magnus'

function Dashboard() {
    const router = useRouter()
    const dispatch = appDispatch()

    return (
        <Container fullscreen centered safeY level={2}>
            <FabScanner />
            <Typography>Dashboard</Typography>
            {/* <Button onPress={() => dispatch(setVisibleModal(null))}>
                Switch store
            </Button> */}
            <Link href="/runchit/modal/switchRole" asChild>
                <Typography>Switch Role</Typography>
            </Link>
        </Container>
    )
}

export default Dashboard
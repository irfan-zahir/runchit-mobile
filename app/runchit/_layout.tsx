import { Container } from '@components/container'
import { SidebarHeader } from '@components/sidebar'
import { Typography } from '@components/typography'
import { selectSidebarState } from '@rtk/selectors/sidebar.selector'
import { setVisibleModal } from '@rtk/slices/sidebar.slice'
import { appDispatch, selector } from '@rtk/store'
import { Stack, Tabs } from 'expo-router'
import React from 'react'
import { Button, Div, Icon, Modal } from 'react-native-magnus'

function BottomBarNav() {
    const dispatch = appDispatch()
    const { activeModal } = selector(selectSidebarState)
    const closeModal = () => dispatch(setVisibleModal(null))

    const [modal, setModal] = React.useState(activeModal)

    React.useEffect(() => {
        setModal(activeModal)

        return () => {

        }
    }, [activeModal])

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='modal' options={{ presentation: "modal", contentStyle: { backgroundColor: "transparent" } }} />
            <Stack.Screen name='(tabs)' />
        </Stack>
    )
}

export default BottomBarNav
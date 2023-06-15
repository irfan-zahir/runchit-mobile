import { Stack } from 'expo-router'
import React from 'react'

function ModalLayout() {
    return (
        <Stack screenOptions={{
            presentation: "modal",
            headerShown: false,
            contentStyle: {
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "transparent"
            }
        }} >
            <Stack.Screen name='profile' options={{ gestureEnabled: false }} />
            <Stack.Screen name='fab_scanner' options={{ gestureEnabled: false }} />
        </Stack>
    )
}

export default ModalLayout
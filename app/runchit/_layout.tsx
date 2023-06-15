import { Stack } from 'expo-router'
import React from 'react'

function BottomBarNav() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='modal' options={{ presentation: "modal", contentStyle: { backgroundColor: "transparent" } }} />
            <Stack.Screen name='(tabs)' />
        </Stack>
    )
}

export default BottomBarNav
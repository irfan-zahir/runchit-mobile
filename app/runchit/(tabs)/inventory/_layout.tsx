import { Stack } from 'expo-router'
import React from 'react'

function InventoryLayout() {
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='[productId]'
                options={{
                    headerTitle: "Update Product",
                    headerStyle: { backgroundColor: "#f7f9fc" },
                    headerTitleStyle: { fontFamily: "fira_600" }
                }} />
        </Stack>
    )
}

export default InventoryLayout
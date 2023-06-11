import { Typography } from '@components/typography'
import React from 'react'
import { Div } from 'react-native-magnus'

export const ProductCard = () => {
    return (
        <Div bg='#fff' shadow="xs" rounded="sm">
            <Div flex={1} alignItems='center' justifyContent='center'>image here</Div>
            <Typography></Typography>
        </Div>
    )
}

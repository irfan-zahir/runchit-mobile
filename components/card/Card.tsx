import React from 'react'
import { Div, DivProps as CardProps } from 'react-native-magnus'

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children, ...cardProps }) => {
    return (
        <Div rounded="sm" shadow="sm" bg='#fff' p={16} {...cardProps}>
            {children}
        </Div>
    )
}
import theme from '@configs/theme.config'
import React from 'react'
import { ThemeProvider as MagnusThemeProvider } from "react-native-magnus"

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <MagnusThemeProvider theme={theme}>{children}</MagnusThemeProvider>
    )
}

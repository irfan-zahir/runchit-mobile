import theme from '@configs/theme.config'
import React from 'react'
import { ThemeProvider as MagnusThemeProvider } from "react-native-magnus"

const MagnusUIProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
    <MagnusThemeProvider theme={theme}>{children}</MagnusThemeProvider>
)

export default MagnusUIProvider
import React from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { store, persistor } from '@rtk/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Div } from "react-native-magnus"

export const ProvidersWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <AuthProvider>
                        <SafeAreaInsetsContext.Consumer>

                            {insets => <Div bg='primary' flex={1} pt={insets?.top}>{children}</Div>}
                        </SafeAreaInsetsContext.Consumer>
                    </AuthProvider>
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    )
}

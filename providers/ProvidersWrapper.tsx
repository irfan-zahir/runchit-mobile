import React from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { store, persistor } from '@rtk/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';

export const ProvidersWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    )
}

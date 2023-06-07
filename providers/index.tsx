import React from "react";
import MagnusUIProvider from "./MagnusUIProvider";
import { AuthProvider } from "./AuthProvider";

import { store, persistor } from '@rtk/store';
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabBarProvider } from "./TabBarProvider";

export default ({ children }: React.PropsWithChildren) => (
    // <SafeAreaProvider>
    <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
            <MagnusUIProvider>
                <AuthProvider>
                    <TabBarProvider>
                        {children}
                    </TabBarProvider>
                </AuthProvider>
            </MagnusUIProvider>
        </PersistGate>
    </ReduxProvider>
    // </SafeAreaProvider>
)
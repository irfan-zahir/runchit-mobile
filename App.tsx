import 'react-native-gesture-handler';
import { ProvidersWrapper } from '@providers/ProvidersWrapper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/navigation';
// import usePermissions from '@hooks/usePermissions';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const permissions = usePermissions()

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ProvidersWrapper>
          <Navigation />
          <StatusBar />
        </ProvidersWrapper>
      </SafeAreaProvider>
    );
  }
}

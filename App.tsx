import 'react-native-gesture-handler';
import { ProvidersWrapper } from '@providers/ProvidersWrapper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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

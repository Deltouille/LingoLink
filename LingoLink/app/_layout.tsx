import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {PaperProvider} from "react-native-paper";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

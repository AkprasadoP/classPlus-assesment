import React, { useEffect } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Syne_700Bold } from '@expo-google-fonts/syne';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useUserStore } from '../store/userStore';
import { ThemeColors } from '../constants/Colors';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)/login',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Syne_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { isLoggedIn } = useUserStore();
  const segments = useSegments();
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)/');
    }
  }, [isLoggedIn, segments, rootNavigationState?.key]);

  // Always use dark theme
  const customDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: ThemeColors.bg,
      card: ThemeColors.surface,
      text: ThemeColors.text,
      primary: ThemeColors.accent,
      border: ThemeColors.border,
    },
  };

  return (
    <ThemeProvider value={customDark}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="card/[id]" options={{ 
          headerShown: true, 
          title: 'Preview & Share', 
          presentation: 'card',
          headerStyle: { backgroundColor: ThemeColors.surface },
          headerTintColor: ThemeColors.text,
          headerTitleStyle: { fontFamily: 'Syne_700Bold' },
        }} />
      </Stack>
    </ThemeProvider>
  );
}

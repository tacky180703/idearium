import { Stack,useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { ThemeProvider as NavigationThemeProvider, DarkTheme} from '@react-navigation/native';
import { IdeasProvider } from '@/context/IdeasContext';
import { TagsProvider } from '@/context/TagsContext';
import { ThemeContext, defaultTheme, useTheme} from '@/context/ThemeContext';
import { NativeStackHeaderRightProps } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const closeAddIdeaModal = (navigation: NativeStackHeaderRightProps) => {
    if (navigation.canGoBack) {
      router.back();
    }
  }

  return (
    <GestureHandlerRootView>
      <IdeasProvider>
        <TagsProvider>
          <ThemeContext.Provider value={defaultTheme}>
            <NavigationThemeProvider value={DarkTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="addIdeaModal"
                  options={{
                    headerShown: false,
                    contentStyle: {
                      flex: 1,
                      backgroundColor: theme.background,
                    },
                    presentation: 'formSheet',
                    gestureDirection: 'vertical',
                    animation: 'slide_from_bottom',
                    sheetGrabberVisible: true,
                    sheetInitialDetentIndex: 0,
                    sheetAllowedDetents: [1.0],
                    gestureEnabled: true,
                  }}
                />
              </Stack>
            </NavigationThemeProvider>
          </ThemeContext.Provider>
        </TagsProvider>
      </IdeasProvider>
    </GestureHandlerRootView>
  );
}


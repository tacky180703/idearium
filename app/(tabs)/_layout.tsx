import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/tabBar'; // カスタムタブバー作る！
import { useTheme } from '@/context/ThemeContext'; 

export default function Layout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.background }}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />} // カスタムタブバーに差し替え
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="tagManager"
          options={{
            tabBarLabel: 'タグ管理',
          }}
        />
        <Tabs.Screen
          name="addIdea"
          options={{
            tabBarLabel: '',
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

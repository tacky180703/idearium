import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      {/* 全体レイヤー */}
      <View style={{ height: 75, backgroundColor: 'transparent' }}>
        
        {/* プラスボタン（上に浮かせる） */}
        <TouchableOpacity
          onPress={() => {navigation.navigate('addIdeaModal');}}
          style={{
            position: 'absolute',
            top: -30,
            left: '50%',
            transform: [{ translateX: -35 }],
            backgroundColor: theme.accent,
            width: 70,
            height: 70,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            zIndex: 10, // 最前面
          }}
        >
          <Ionicons name="add" size={36} color={theme.background} />
        </TouchableOpacity>

        {/* タブボタンたち */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: theme.primary,
          height: 75,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 20,
        }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            if (route.name === 'addIdea') {
              return null;
            }

            const onPress = () => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            };

            const iconName = route.name === 'index' ? 'home' : 'pricetags';

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{ alignItems: 'center' }}
              >
                <Ionicons
                  name={iconName as any}
                  size={24}
                  color={isFocused ? theme.accent : '#888'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

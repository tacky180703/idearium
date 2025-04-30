import { useIdeas } from '@/context/IdeasContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View} from 'react-native';
import StreakCard from '@/components/homeTabCards/streakCard';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext'; 

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, padding: 8, backgroundColor: theme.background }}>
        <View style={{ margin: 16}}>
          <Text style={{ fontWeight: '900', fontSize: 28, marginVertical: 3, color: theme.textPrimary }}>こんにちは、Tacky</Text>
          <Text style={{ fontSize: 16, marginVertical: 3, color: theme.textSecondary }}>周りを見渡してみて</Text>
        </View>
        <StreakCard />
      </View>
    </SafeAreaView>
  );
}

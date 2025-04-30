import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';

export default function StreakCard() {
  const theme = useTheme();

  const size = 100; // インジケーターのサイズ
  const strokeWidth = 16;
  const progress = 0.75; // 75% 達成！
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{
      borderRadius: 24,
      backgroundColor: theme.secondary,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* タイトル */}
        <Text style={{
          fontSize: 20, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 12
        }}>
          Streak
        </Text>
        <Text style={{
          fontSize: 48, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 12
        }}>
          30
        </Text>
        <Text style={{
          fontSize: 20, color: theme.textSecondary, marginBottom: 12
        }}>
          day streak
        </Text>
      </View>

      {/* インジケーター */}
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={size} height={size}>
          {/* 背景の円 */}
          <Circle
            stroke={theme.primary}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* 進捗の円 */}
          <Circle
            stroke={theme.accent}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>

        {/* 真ん中のパーセント表示 */}
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textPrimary }}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
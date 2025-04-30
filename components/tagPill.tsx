import { useTheme } from '@/context/ThemeContext';
import { View, Text, TouchableOpacity } from 'react-native';

type TagPillProps = {
  tag: string;
  color: string;
  isSelected?: boolean;
  onPress?: (tag: string) => void;
};

export default function TagPill({
  tag,
  color,
  isSelected = false,
  onPress,
}: TagPillProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
    onPress={() => onPress && onPress(tag)}
    style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isSelected ? color : theme.primary,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
      }}
    >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16,color: theme.textPrimary }}>{tag}</Text>
      </View>
    </TouchableOpacity>
  );
}


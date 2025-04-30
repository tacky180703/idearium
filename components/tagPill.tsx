import { View, Text, TouchableOpacity } from 'react-native';

type TagPillProps = {
  tag: string;
  color: string;
  isSelected?: boolean;
  onPress?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  removable?: boolean;
};

export default function TagPill({
  tag,
  color,
  isSelected = false,
  onPress,
  onRemove,
  removable = false,
}: TagPillProps) {
  const backgroundColor = isSelected ? color : '#eee';
  const textColor = isSelected ? '#fff' : '#000';

  return (
    <TouchableOpacity
    onPress={() => onPress && onPress(tag)}
    style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
        margin: 4,
      }}
    >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: textColor }}>{tag}</Text>
      </View>
      {/* {removable && onRemove && (
        <TouchableOpacity onPress={() => onRemove(tag)}>
          <Text style={{ marginLeft: 6, color: '#888' }}>×</Text>
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  );
}


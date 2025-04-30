import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTags } from '@/context/TagsContext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TagAddModal({ visible, onClose }: Props) {
  const { tagCategories, addTagsToCategory } = useTags();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (!selectedCategory || !newTag.trim()) return;
    addTagsToCategory(selectedCategory, [newTag.trim()]);
    setNewTag('');
    onClose(); // 閉じる
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>タグを追加</Text>

          {/* カテゴリ選択 */}
          {tagCategories.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              onPress={() => setSelectedCategory(cat.name)}
              style={[
                styles.categoryButton,
                selectedCategory === cat.name && styles.categorySelected,
              ]}
            >
              <Text>{cat.name}</Text>
            </TouchableOpacity>
          ))}

          {/* タグ入力 */}
          <TextInput
            placeholder="タグ名を入力"
            value={newTag}
            onChangeText={setNewTag}
            style={styles.input}
          />

          {/* 追加ボタン */}
          <TouchableOpacity onPress={handleAddTag} style={styles.addButton}>
            <Text style={{ color: '#fff' }}>追加</Text>
          </TouchableOpacity>

          {/* キャンセル */}
          <TouchableOpacity onPress={onClose} style={{ marginTop: 12 }}>
            <Text style={{ color: '#888', textAlign: 'center' }}>キャンセル</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  categoryButton: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  categorySelected: {
    backgroundColor: '#add8e6',
  },
  addButton: {
    backgroundColor: '#007aff',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

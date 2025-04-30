import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTags } from '@/context/TagsContext';
import TagPill from '@/components/tagPill';

export default function TagsManagerScreen() {
  const { tagCategories, addCategory, updateTagsForCategory } = useTags();
  const [newCategory, setNewCategory] = useState('');
  const [newTags, setNewTags] = useState<{ [category: string]: string }>({});
  const [newColor, setNewColor] = useState('#000000');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    addCategory(newCategory.trim(), newColor.trim());
    setNewCategory('');
    setNewColor('#000000');
  };

  const handleTagInputChange = (category: string, value: string) => {
    setNewTags(prev => ({ ...prev, [category]: value }));
  };

  const handleAddTag = (category: string) => {
    const newTag = newTags[category]?.trim();
    if (!newTag) return;

    const currentTags = tagCategories.find(cat => cat.category === category)?.tags || [];
    const updatedTags = [...currentTags, newTag];
    updateTagsForCategory(category, updatedTags);
    setNewTags(prev => ({ ...prev, [category]: '' }));
  };

  const handleRemoveTag = (category: string, tagToRemove: string) => {
    const updatedTags = tagCategories.find(cat => cat.category === category)?.tags.filter(tag => tag !== tagToRemove) || [];
    updateTagsForCategory(category, updatedTags);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* カテゴリ追加フォーム */}
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>カテゴリを追加</Text>
      <TextInput
        value={newCategory}
        onChangeText={setNewCategory}
        placeholder="新しいカテゴリ名"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {['#F44336', '#4CAF50', '#2196F3'].map(color => (
          <TouchableOpacity
            key={color}
            onPress={() => setNewColor(color)}
            style={{
              backgroundColor: color,
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 8,
              borderWidth: newColor === color ? 2 : 0,
              borderColor: '#000',
            }}
          />
        ))}
      </View>
      <Button title="追加" onPress={handleAddCategory} />

      {/* カテゴリ一覧とタグ編集 */}
      <FlatList
        data={tagCategories}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.category}</Text>

            {/* ピル型タグの表示 */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {item.tags.map((tag) => (
                <TagPill key={tag} tag={tag} onRemove={() => handleRemoveTag(item.category, tag)} color={item.color} />
              ))}
            </View>

            {/* 新しいタグ追加欄 */}
            <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
              <TextInput
                value={newTags[item.category] || ''}
                onChangeText={(text) => handleTagInputChange(item.category, text)}
                placeholder="新しいタグを入力"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 8,
                }}
              />
              <TouchableOpacity onPress={() => handleAddTag(item.category)} style={{
                backgroundColor: '#2196F3',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
              }}>
                <Text style={{ color: '#fff' }}>追加</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

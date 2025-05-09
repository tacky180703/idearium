import { Modal, View, TextInput, Button, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useIdeas } from '@/context/IdeasContext';
import { useTags } from '@/context/TagsContext';
import TagPill from '@/components/tagPill';
import { useTheme } from '@/context/ThemeContext';
import TagAddModal from './addTagModal';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddIdeaModal() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [initialLog, setInitialLog] = useState('');
  const { ideas, addIdea, updateIdea } = useIdeas();
  const { tagCategories, addTagsToCategory } = useTags();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  // カテゴリごとに選択されたタグの配列
  // 宣言方法　const [state名, 更新関数名] = useState(初期値)
  const [selectedTags, setSelectedTags] = useState<{ [category: string]: string[] }>({});

  //タグ追加ボタンが押されたカテゴリーを保存
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState('');

  const [newTag, setNewTag] = useState('');


  // const addTag = () => {
  //   if (newTag.trim() === '') return;

  //   addTagsToCategory(selectedCategoryForAdd, [newTag.trim()]);
  //   setIdeaTags(prev => ({
  //     ...prev,
  //     [selectedCategoryForAdd]: [...(prev[selectedCategoryForAdd] || []), newTag.trim()],
  //   }));

  //   // 初期化
  //   setNewTag('');
  //   setSelectedCategoryForAdd('');
  //   setModalVisible(false);
  // };

  const toggleTag = (category: string, tag: string) => {
    const currentTags = selectedTags[category] || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setSelectedTags(prev => ({ ...prev, [category]: updatedTags }));
  };

  // アイデア保存関数
  // const saveIdea = () => {
  //   // 未入力時の例外処理
  //   if (input.trim() === '') return;

  //   const initialLogs = initialLog.trim()
  //     ? [{ message: initialLog.trim(), date: new Date() }]
  //     : [];

  //   const existingIdea = ideas.find(i => i.name.trim() === input.trim());

  //   if (existingIdea) {
  //     const updatedTags = tagCategories.map(cat => {
  //       const existingCat = existingIdea.tagCategories.find(c => c.category === cat.category);
  //       const newTags = ideaTags[cat.category] || [];
  //       return {
  //         category: cat.category,
  //         tags: Array.from(new Set([...(existingCat?.tags || []), ...newTags])),
  //         color: cat.color,
  //       };
  //     });

  //     const updatedIdea = {
  //       ...existingIdea,
  //       tagCategories: updatedTags,
  //       logs: [...existingIdea.logs, ...initialLogs],
  //     };

  //     updateIdea(updatedIdea);
  //   } else {
  //     const newIdea = {
  //       id: Date.now(),
  //       name: input.trim(),
  //       createdAt: new Date(),
  //       tagCategories: tagCategories.map(cat => ({
  //         category: cat.category,
  //         tags: ideaTags[cat.category] || [],
  //         color: cat.color,
  //       })),
  //       logs: initialLogs,
  //     };

  //     addIdea(newIdea);
  //   }

  //   setInput('');
  //   setInitialLog('');
  //   setIdeaTags({});
  //   router.push('./');
  // };

  return (
    <View style={{
      flex: 1,
      padding: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    }}>
      {/* アイデア名テキストボックス */}
      <Text style={{
        fontWeight: '900',
        color: theme.textPrimary,
        fontSize: 24,
        marginVertical: 6,
      }}>
        アイデア名
      </Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="どんなものを発見した？"
        placeholderTextColor={theme.textSecondary}
        style={{
          color: theme.textPrimary,
          fontWeight: 'bold',
          borderWidth: 1,
          borderColor: '#ffffff',
          borderRadius: 8,
          padding: 12,
          marginVertical: 6,
        }}
      />

      <View
        style={{
          height: 1,
          backgroundColor: theme.textPrimary, // 少し薄めのグレー
          marginVertical: 12,
        }}
      />

      <Text style={{
        fontWeight: '900',
        color: theme.textPrimary,
        fontSize: 24,
        marginVertical: 6,
      }}>タグ</Text>
      <View style={{ paddingHorizontal: 16 }}>
        {tagCategories.map((cat) => (
          <View key={cat.name} style={{ marginBottom: 16 }}>
            {/* 「--」で考えてみる */}
            <View style={{flexDirection: 'row',alignItems: 'flex-end'}}>
              <Text style={{
                fontWeight: '900',
                color: theme.textPrimary,
                fontSize:20,
              }}>
                「{cat.name}」
              </Text>
              <Text style={{
                color: theme.textSecondary,
                fontSize:16,
              }}>
                で考えてみる
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cat.tags.map((tag,index) => (
                <TagPill key={index} tag={tag} color={cat.color} isSelected={(selectedTags[cat.name] || []).includes(tag)} onPress={() => toggleTag(cat.name,tag)}/>
              ))}
              <TagPill key={''} tag={'＋'} color={'#ffffff'} isSelected={false} onPress={() => setModalVisible(true)}/>
            </ScrollView>
          </View>
        ))}
      </View>
      <TagAddModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
    
  );
}

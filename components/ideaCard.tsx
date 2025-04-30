import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import TagPill from './tagPill';

type IdeaCardProps = {
  id: number; // ← これ必要！
  name: string;
  tagCategories: {
    category: string;
    tags: string[];
    color: string;
  }[];
};

export default function IdeaCard({ id, name, tagCategories }: IdeaCardProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity onPress={() => router.push(`/idea/${id}`)}>
      <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
          {tagCategories.flatMap((cat) =>
            cat.tags.map((tag, index) => (
              <TagPill
                key={`${cat.category}-${index}`}
                tag={tag}
                color={cat.color}
                isSelected={true}
                removable={false}
              />
            ))
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

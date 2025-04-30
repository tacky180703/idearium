import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TagCategory } from '@/types/Idea';

type TagsContextType = {
  tagCategories: TagCategory[];
  addTagsToCategory :(category: string, newTags: string[]) => void;
  addCategory: (category: string, color:string) => void;
  updateTagsForCategory: (category: string, tags: string[]) => void;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [tagCategories, setTagCategories] = useState<TagCategory[]>([
    { name: '形状', tags: [], color: '#005B9C'},
    { name: 'イメージ', tags: [], color: '#D92028'},
    { name: '色', tags: [], color: '#48A95A'},
  ]);

  const addTagsToCategory = (category: string, newTags: string[]) => {
    setTagCategories(prev =>
      prev.map(cat => {
        if (cat.name === category) {
          const uniqueTags = Array.from(new Set([...cat.tags, ...newTags]));
          return { ...cat, tags: uniqueTags };
        }
        return cat;
      })
    );
  };

  
  const addCategory = (name: string, color: string) => {
  if (!tagCategories.find(cat => cat.name=== name)) {
    setTagCategories([...tagCategories, { name, tags: [], color }]);
  }
};


  const updateTagsForCategory = (category: string, tags: string[]) => {
    setTagCategories(prev =>
      prev.map(cat => cat.name === category ? { ...cat, tags } : cat)
    );
  };

  return (
    <TagsContext.Provider value={{ tagCategories, addTagsToCategory, addCategory, updateTagsForCategory }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};

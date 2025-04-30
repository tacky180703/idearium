export type TagCategory = {
  name: string;
  tags: string[];
  color: string;
}

export type Log = {
  message: string;
  date: Date;
};

export type Idea = {
  id: number;
  name: string;
  tagCategories: TagCategory[];
  createdAt: Date;
  logs: Log[]; 
};
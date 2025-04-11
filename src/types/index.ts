export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type Question = {
  id: string;
  title: string;
  categoryId: string;
  content: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export type Categories = {
  [key: string]: Category;
};

export type Questions = {
  [key: string]: Question;
};

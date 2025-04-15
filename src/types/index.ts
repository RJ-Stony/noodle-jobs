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
  answer: string;
};

export type CSVQuestion = {
  id: string;
  title: string;
  categoryId: string;
  answer: string;
};

export type Categories = {
  [key: string]: Category;
};

export type Questions = {
  [key: string]: Question;
};

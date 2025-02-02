import { Tag } from './tag';

export interface QuestionsResponse {
  items: Question[];
  total: number;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  images: Image[];
  author: Author;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  countAnswers: number;
  isResolved: boolean;
  views: number;
  likeUserIds: string[];
  countLikes: number;
  countDislikes: number;
  rating: number;
  dislikeUserIds: string[];
}

export interface Answer {
  id: number;
  text: string;
  author: Author;
  questionId: number;
  isSolution: boolean;
  likeUserIds: string[];
  dislikeUserIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: number;
  name: string;
  size: number;
  mimetype: string;
}

export interface Author {
  id: number;
  email: string;
  nickname: string;
  description: string;
  avatar: Image;
}

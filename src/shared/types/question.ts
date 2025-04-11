import { Tag } from './tag';
import { Avatar } from './user';

export interface QuestionsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  title?: string;
  description?: string;
  isWithoutAnswer?: boolean;
  isWithoutView?: boolean;
  isWithoutRating?: boolean;
  isResolved?: boolean;
  tagIds?: number[];
  favoriteUserId?: number;
}

export interface QuestionsRequest {
  items: Question[];
  total: number;
}

export interface QuestionsResponse {
  items: Question[];
  pageParams: number[];
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
  likeUserIds: number[];
  countLikes: number;
  countDislikes: number;
  rating: number;
  dislikeUserIds: number[];
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
  isOnline: boolean;
  wasOnlineAt: string;
  avatar: Avatar;
  countQuestions: number;
  countAnswers: number;
  rating: number;
}

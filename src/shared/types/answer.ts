import { Author, Question } from './question';

export interface Answer {
  id: number;
  text: string;
  author: Author;
  question: Question;
  isSolution: boolean;
  likeUserIds: string[];
  dislikeUserIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AddAnswerParams {
  questionId: number;
  text: string;
}

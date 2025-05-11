import { Author, Question } from './question';
import { Avatar } from './user';

export interface Answer {
  id: number;
  text: string;
  author: Author;
  question: Question;
  avatar: Avatar;
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

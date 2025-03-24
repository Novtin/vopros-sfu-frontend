import { Question } from '@/shared/types/question';

export interface QuestionRowProps {
  question: Question;
}

export interface QuestionTableProps {
  questions: Question[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

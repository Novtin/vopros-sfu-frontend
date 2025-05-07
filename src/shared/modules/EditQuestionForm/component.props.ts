import { Question } from '@/shared/types/question';

export interface EditQuestionFormProps {
  onClose: () => void;
  dataQuestion: Question;
}

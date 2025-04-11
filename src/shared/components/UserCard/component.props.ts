import { ResponseUserData } from '@/shared/types/user';

export type Variant = 'usersTable' | 'answerQuestion';

export interface UserCardProps {
  userData: ResponseUserData;
  variant?: Variant;
}

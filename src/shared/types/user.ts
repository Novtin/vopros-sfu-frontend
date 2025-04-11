export type Avatar = {
  id: number;
  name: string;
  size: number;
  mimetype: string;
};

export type UsersResponse = {
  items: UserData[];
  total: number;
};

export type UserData = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  isOnline: boolean;
  wasOnlineAt: string;
  avatar: Avatar;
  countQuestions: number;
  countAnswers: number;
  favoriteQuestionIds: number[];
  rating: number;
};

export interface RegisterUserData {
  email: string;
  password: string;
  nickname: string;
}

export interface ResponseUserData {
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

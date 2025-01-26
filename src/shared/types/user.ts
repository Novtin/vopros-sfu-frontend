export type Avatar = {
  id: number;
  name: string;
  size: number;
  mimetype: string;
};

export type UserData = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  avatar: Avatar;
};

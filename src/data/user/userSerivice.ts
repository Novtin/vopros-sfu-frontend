import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
} from '@/shared/assets';
import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

const avatarList = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return { avatar: avatarList[randomIndex], index: randomIndex };
};

const saveAvatarToLocalStorage = (avatar: string, index: number) => {
  localStorage.setItem('avatar', avatar);
  localStorage.setItem('avatarIndex', index.toString());
};

export const getSavedAvatar = (): string => {
  const savedAvatar = localStorage.getItem('avatar');
  if (savedAvatar) return savedAvatar;

  const savedAvatarIndex = localStorage.getItem('avatarIndex');
  if (savedAvatarIndex) {
    return avatarList[parseInt(savedAvatarIndex, 10)];
  }

  const { avatar, index } = getRandomAvatar();
  saveAvatarToLocalStorage(avatar, index);
  return avatar;
};

export const fetchUserData = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.get(`${BASE_API_URL}/user/this`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

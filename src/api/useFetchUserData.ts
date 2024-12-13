import { useState, useEffect, useContext } from 'react';
import {
  Avatar1,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
} from '@/shared/assets';
import { BASE_API_URL } from '@/app/consts';
import { AuthContext } from '@/app/hooks/useAuth';

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

export const useFetchUserData = () => {
  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem('avatar') || '';
  });
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('nickname') || '';
  });
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) return;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Токен не найден');
          return;
        }

        const response = await fetch(`${BASE_API_URL}/user/this`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        if (data && data.avatar) {
          setAvatar(data.avatar.name);
          localStorage.setItem('avatar', data.avatar.name);
        } else {
          const savedAvatarIndex = localStorage.getItem('avatarIndex');
          if (savedAvatarIndex) {
            const avatarFromList = avatarList[parseInt(savedAvatarIndex)];
            setAvatar(avatarFromList);
            localStorage.setItem('avatar', avatarFromList);
          } else {
            const randomIndex = Math.floor(Math.random() * avatarList.length);
            const randomAvatar = avatarList[randomIndex];
            setAvatar(randomAvatar);
            localStorage.setItem('avatarIndex', randomIndex.toString());
            localStorage.setItem('avatar', randomAvatar);
          }
        }

        setNickname(data.nickname);
        localStorage.setItem('nickname', data.nickname);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isAuth]);

  return { avatar, nickname };
};

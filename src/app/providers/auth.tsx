import React, { useState, useEffect, ReactNode } from 'react';
import { BASE_API_URL } from '../consts';
import { AuthContext } from '../hooks/useAuth';
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuth(true);
    } else {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        refreshAccessToken(refreshToken)
          .then(() => setIsAuth(true))
          .catch(() => setIsAuth(false));
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsAuth(true);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось авторизоваться');
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      throw new Error('Ошибка соединения');
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${BASE_API_URL}/auth/refresh}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        throw new Error('Не удалось обновить токен');
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      setIsAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuth(false);
    window.location.href = '/login';
  };

  return <AuthContext.Provider value={{ isAuth, login, logout, refreshAccessToken }}>{children}</AuthContext.Provider>;
};

import React, { useState, useEffect, ReactNode } from 'react';
import { BASE_API_URL } from '../consts';
import { AuthContext } from '../hooks/authentication/useAuth';
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginId, setLoginId] = useState<string | null>(null);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const storedLoginId = loginId || localStorage.getItem('loginId');
      if (!storedLoginId) {
        throw new Error('loginId отсутствует');
      }

      const response = await fetch(`${BASE_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId: storedLoginId, refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.accessToken;
      } else {
        throw new Error('Не удалось обновить токен');
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      setIsAuth(false);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuth(true);
      const storedLoginId = localStorage.getItem('loginId');
      if (storedLoginId) {
        setLoginId(storedLoginId);
      }
      setIsLoading(false);
    } else {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        refreshAccessToken(refreshToken)
          .then(() => {
            setIsAuth(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsAuth(false);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
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
        setLoginId(data.loginId);
        localStorage.setItem('loginId', data.loginId.toString());
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsAuth(true);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось авторизоваться');
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Ошибка соединения');
    }
  };

  const logout = async () => {
    const storedLoginId = loginId || localStorage.getItem('loginId');
    if (storedLoginId) {
      try {
        await fetch(`${BASE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            loginId: typeof storedLoginId === 'string' ? parseInt(storedLoginId) : storedLoginId,
          }),
        });
      } catch (error) {
        console.error('Ошибка при выходе:', error);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loginId');
    setIsAuth(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuth, isLoading, loginId, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

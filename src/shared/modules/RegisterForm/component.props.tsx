import { HTMLAttributes } from 'react';

export interface IFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  email?: string;
  password?: string;
  nickname?: string;
  confirmPassword?: string;
  onRegisterSuccess?: () => void;
}

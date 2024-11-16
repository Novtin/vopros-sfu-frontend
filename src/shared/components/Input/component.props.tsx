import { InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  className?: string;
  toggleVisibility?: boolean;
  error?: string;
  success?: boolean;
}

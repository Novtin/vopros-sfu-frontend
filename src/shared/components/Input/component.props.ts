import { InputHTMLAttributes } from 'react';

export type Variant = 'login' | 'primary';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  className?: string;
  toggleVisibility?: boolean;
  error?: string;
  success?: boolean;
  variant?: Variant;
  optionalMargin?: boolean;
}

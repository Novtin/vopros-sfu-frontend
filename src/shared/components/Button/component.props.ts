import type { ButtonHTMLAttributes } from 'react';

export type Variant = 'primary' | 'secondary' | 'filterBar';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

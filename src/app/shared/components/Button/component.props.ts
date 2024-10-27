import type { ButtonHTMLAttributes } from 'react';

export type Variant = 'primary';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

import { TextareaHTMLAttributes } from 'react';

export interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  success?: boolean;
}

import { HTMLAttributes } from 'react';

export type ResetPasswordFormProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
};

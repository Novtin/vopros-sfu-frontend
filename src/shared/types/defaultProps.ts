import type { HTMLAttributes } from 'react';

type HTMLProps = HTMLAttributes<HTMLElement>;
export interface IDefaultProps {
  className?: HTMLProps['className'];
  children?: HTMLProps['children'];
}

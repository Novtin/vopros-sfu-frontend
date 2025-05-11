export interface NavItemProps {
  icon: string;
  text: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

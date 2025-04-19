export interface ImageWithHookProps {
  id: number;
  title: string;
  onDelete?: (id: number) => void;
}

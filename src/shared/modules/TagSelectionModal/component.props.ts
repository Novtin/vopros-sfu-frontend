export interface TagSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedTags: number[];
  onApply: (selectedTagIds: number[]) => void;
}

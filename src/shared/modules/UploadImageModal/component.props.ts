export interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  multiple?: boolean;
  onUpload: (files: File[], userId?: number) => void;
}

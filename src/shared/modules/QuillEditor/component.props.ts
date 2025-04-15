export interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

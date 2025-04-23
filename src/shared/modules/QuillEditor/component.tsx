import ReactQuill from 'react-quill';
import { QuillEditorProps } from './component.props';
import { FORMATS, LABEL, MODULES, PLACEHOLDER } from './constants';

export const QuillEditor = ({ value, onChange, error, label = LABEL, placeholder = PLACEHOLDER }: QuillEditorProps) => {
  return (
    <div className="mb-4">
      <label className="block text-xl text-base-grey-07 font-bold mb-2">{label}</label>
      <style>
        {`
      .quill-editor .ql-editor {
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
      }
        .quill-editor .ql-editor::before {
        color: #a0aec0;
    }
    `}
      </style>
      <div className="text-base-grey-09 quill-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={MODULES}
          formats={FORMATS}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

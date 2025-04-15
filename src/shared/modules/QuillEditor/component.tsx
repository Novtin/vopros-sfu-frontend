import ReactQuill from 'react-quill';
import { QuillEditorProps } from './component.props';
import { FORMATS, MODULES } from './constants';

export const QuillEditor = ({ value, onChange, error }: QuillEditorProps) => {
  return (
    <div className="mb-4">
      <label className="block text-xl text-base-grey-07 font-bold mb-2">Основная часть</label>
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
          placeholder="Добавьте всю информацию, которая может понадобиться для ответа на ваш вопрос."
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

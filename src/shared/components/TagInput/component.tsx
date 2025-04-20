import { useRef, useState } from 'react';
import { TagInputProps } from './component.props';
import { Tag } from '@/shared/types';
import { Input } from '../Input';

export const TagInput = ({ allTags, selectedTags, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: Tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      onChange([...selectedTags, tag]);
    }
    setInputValue('');
  };

  const removeTag = (id: number) => {
    onChange(selectedTags.filter(tag => tag.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && inputValue.trim()) {
      const found = allTags.find(tag => tag.name.toLowerCase() === inputValue.trim().toLowerCase());
      if (found) {
        addTag(found);
      }
      e.preventDefault();
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length) {
      removeTag(selectedTags[selectedTags.length - 1].id);
    }
  };

  const filteredSuggestions = allTags.filter(
    tag => tag.name.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.find(t => t.id === tag.id),
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 border p-2 rounded bg-base-grey-01">
        {selectedTags.map(tag => (
          <div
            key={tag.id}
            className="flex items-center bg-orange-400 text-base-grey-09 px-2 py-0.5 rounded-full text-sm"
          >
            {tag.name}
            <button onClick={() => removeTag(tag.id)} className="ml-1">
              ×
            </button>
          </div>
        ))}
        <div className="flex-grow min-w-[100px]">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Введите теги"
            className="bg-transparent border-none px-0 py-0 shadow-none h-auto mb-0"
            variant="primary"
            optionalMargin
          />
        </div>
      </div>
      {inputValue && (
        <ul className="absolute bg-white border mt-1 max-h-40 overflow-y-auto z-10 w-64 rounded shadow-sm">
          {filteredSuggestions.map(tag => (
            <li key={tag.id} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onMouseDown={() => addTag(tag)}>
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

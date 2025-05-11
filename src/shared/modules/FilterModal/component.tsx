import { Button } from '@/shared/components/Button';
import { useState, useMemo, useEffect } from 'react';
import { CHECKBOX_FILTERS } from './constants';
import { FilterModalProps } from './component.props';
import { useAllTags } from '@/app/hooks/tags/useGetAllTags';
import { Tag } from '@/shared/types';
import { TagInput } from '@/shared/components/TagInput';

export const FilterModal = ({ currentFilters, onApplyFilters, initialSelectedTags }: FilterModalProps) => {
  const [open, setOpen] = useState(false);
  const { data: allTagsData } = useAllTags({ pageSize: 1000 });
  const allTags = allTagsData?.items ?? [];

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const tagIds = useMemo(() => selectedTags.map(tag => tag.id), [selectedTags]);

  const handleCheckboxChange = (field: keyof typeof localFilters) => {
    setLocalFilters(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleApply = () => {
    onApplyFilters({ ...localFilters, tagIds });
    setOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      isWithoutAnswer: false,
      isWithoutView: false,
      isWithoutRating: false,
      isResolved: false,
      tagIds: [],
    };
    setLocalFilters(resetFilters);
    setSelectedTags([]);
    onApplyFilters(resetFilters);
  };

  useEffect(() => {
    if (initialSelectedTags && initialSelectedTags.length > 0) {
      setSelectedTags(initialSelectedTags);
      setLocalFilters(prev => ({ ...prev, tagIds: initialSelectedTags.map(tag => tag.id) }));
    }
  }, [initialSelectedTags]);

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className="py-1 px-6 rounded-xl text-base font-opensans 
                   bg-base-grey-01 text-base-blue-01 border-2 border-base-blue-01 
                   hover:bg-base-grey-02 hover:text-base-blue-02 focus:border-base-blue-01"
      >
        Фильтр
      </Button>
      {open && (
        <div className="absolute top-12 right-0 w-96 bg-base-grey-03 rounded-lg p-4 border border-base-grey-05 z-10">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-medium text-base-grey-09 mb-2">Фильтрация</label>
              <div className="flex flex-col gap-2">
                {CHECKBOX_FILTERS.map(({ key, label }) => (
                  <label key={key} className="text-base-grey-08">
                    <input
                      type="checkbox"
                      className="mr-1.5"
                      checked={localFilters[key]}
                      onChange={() => handleCheckboxChange(key)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium text-base-grey-09 mb-1">Теги</label>
              <TagInput allTags={allTags} selectedTags={selectedTags} onChange={setSelectedTags} />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm"
              >
                Сбросить
              </Button>
              <Button variant="secondary" className="text-white text-sm px-3 py-1" onClick={handleApply}>
                Применить фильтр
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/components/Button';
import { TagInput } from '@/shared/components/TagInput';
import { useAllTags } from '@/app/hooks/tags/useGetAllTags';
import { Tag } from '@/shared/types';
import { useTags } from '@/app/hooks/tags/useGetTags';
import { TagSelectionModalProps } from './component.props';
import { Loader } from '@/shared/components/Loader';

export const TagSelectionModal = ({ isOpen, onClose, initialSelectedTags, onApply }: TagSelectionModalProps) => {
  const { data: allTagsData } = useAllTags({ pageSize: 50 });
  const allTags = useMemo(() => allTagsData?.items ?? [], [allTagsData]);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: tagsData, isLoading } = useTags();
  const tags = tagsData?.pages.flatMap(page => page.items) || [];

  useEffect(() => {
    if (initialSelectedTags.length > 0 && allTags.length > 0) {
      const tags = allTags.filter(tag => initialSelectedTags.includes(tag.id));
      setSelectedTags(tags);
    }
  }, [initialSelectedTags, allTags]);

  const selectedTagIds = useMemo(() => selectedTags.map(tag => tag.id), [selectedTags]);

  const handleApply = () => {
    onApply(selectedTagIds);
    onClose();
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-base-grey-06 rounded-2xl shadow-lg p-6 max-w-xl w-full relative">
        <h2 className="text-xl font-bold mb-4 text-base-grey-09">Выберите интересующие теги</h2>
        <div className="flex flex-col gap-4">
          <TagInput allTags={allTags} selectedTags={selectedTags} onChange={setSelectedTags} />
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <div
                key={tag.id}
                className="w-fit text-sm inline-block h-fit py-1 px-3 rounded-full bg-base-grey-04 text-base-grey-08"
              >
                {tag.name}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button className="text-base px-3 py-1" variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button className="text-base px-3 py-1" onClick={handleApply} disabled={selectedTagIds.length === 0}>
              Применить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { useState } from 'react';
import { SORT_OPTIONS } from './constants';

export const FilterModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState({ label: 'Новые', value: 'new' });

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className={`py-1 px-6 rounded-xl text-base align-middle 
            ${'bg-base-grey-01 text-base-blue-01 font-opensans border-2 border-base-blue-01 hover:bg-base-grey-02 hover:text-base-blue-02 focus:border-base-blue-01'}`}
      >
        Фильтр
      </Button>
      {open && (
        <div className="absolute top-12 right-0 w-96 bg-base-grey-03 rounded-lg p-4 border border-base-grey-05">
          <div className="flex flex-col gap-2">
            <div>
              <label className="block font-medium text-base-grey-09">Фильтрация</label>
              <div className="flex flex-col gap-2">
                <label className="text-base-grey-08">
                  <input type="checkbox" className="mr-1.5" />
                  Без ответов
                </label>
                <label className="text-base-grey-08">
                  <input type="checkbox" className="mr-1.5" />
                  Без просмотров
                </label>
                <label className="text-base-grey-08">
                  <input type="checkbox" className="mr-1.5" />
                  Без голосов
                </label>
              </div>
            </div>
            <div>
              <Select
                label="Сортировка"
                options={SORT_OPTIONS}
                selected={selectedSort}
                onChange={setSelectedSort}
                className="w-full"
                labelClassName="text-base text-base-grey-09 font-medium"
              />
            </div>
            <div>
              <label className="block font-medium text-base-grey-09">Теги</label>
              <Input type="text" variant="primary" placeholder="Например, javascript или python" className="w-full" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm"
            >
              Отмена
            </Button>
            <Button variant="secondary" className="text-white text-sm px-3 py-1">
              Применить фильтр
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

import { Tag } from '@/shared/types/tag';
import { TagCell } from '../TagCell';
import { TagsTableProps } from './component.props';
import { chunkArray } from './constants';
import React from 'react';

export const TagsTableGrid = ({ tags }: TagsTableProps) => {
  const tagChunks = chunkArray(tags, 10);
  if (!tags || tags.length === 0) {
    return <div className="text-center text-gray-500 p-4 ">Тегов пока нет</div>;
  }
  return (
    <div>
      {tagChunks.map((chunk, index) => {
        const isMirrored = (index + 1) % 2 === 0;
        return (
          <div key={index} className={isMirrored ? 'transform scale-x-[-1]' : ''}>
            <TagChunk chunk={chunk} isMirrored={isMirrored} />
          </div>
        );
      })}
    </div>
  );
};

const TagChunk = React.memo(({ chunk, isMirrored }: { chunk: Tag[]; isMirrored: boolean }) => {
  const mirroredClass = isMirrored ? 'transform scale-x-[-1]' : '';
  return (
    <div key={chunk[0]?.id || Math.random()} className="grid grid-flow-col gap-4 mb-4">
      {chunk[0] && (
        <div className={isMirrored ? 'transform scale-x-[-1]' : ''}>
          <TagCell className="bg-base-grey-07 min-w-[175px]" tag={chunk[0]} />
        </div>
      )}
      {chunk[1] && (
        <div className={`grid grid-flow-row gap-2 ${mirroredClass}`}>
          <div>
            <TagCell className="bg-base-red-01" tag={chunk[1]} />
          </div>
          {(chunk[2] || chunk[3]) && (
            <div className="grid grid-flow-col gap-2">
              {chunk[2] && (
                <div>
                  <TagCell className="bg-base-yellow-01" tag={chunk[2]} />
                </div>
              )}
              {chunk[3] && (
                <div>
                  <TagCell className="bg-base-blue-05" tag={chunk[3]} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {chunk[4] && (
        <div className={`grid grid-flow-row gap-2 ${mirroredClass}`}>
          <div>
            <TagCell className="bg-base-blue-06" tag={chunk[4]} />
          </div>
          {(chunk[5] || chunk[6]) && (
            <div className="grid grid-flow-col gap-2">
              {chunk[5] && (
                <div>
                  <TagCell className="bg-base-grey-10" tag={chunk[5]} />
                </div>
              )}
              {chunk[6] && (
                <div>
                  <TagCell className="bg-base-blue-04" tag={chunk[6]} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {(chunk[7] || chunk[8] || chunk[9]) && (
        <div className={`grid grid-flow-row gap-2 ${mirroredClass}`}>
          {(chunk[7] || chunk[8]) && (
            <div className="grid grid-flow-col gap-2">
              {chunk[7] && (
                <div>
                  <TagCell className="bg-base-green-03" tag={chunk[7]} />
                </div>
              )}
              {chunk[8] && (
                <div>
                  <TagCell className="bg-base-orange-03" tag={chunk[8]} />
                </div>
              )}
            </div>
          )}
          {chunk[9] && (
            <div>
              <TagCell className="bg-base-grey-11" tag={chunk[9]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

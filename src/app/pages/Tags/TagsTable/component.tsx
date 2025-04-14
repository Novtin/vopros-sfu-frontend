import { Tag } from '@/shared/types/tag';
import { TagCell } from '../TagCell';
import { TagsTableProps } from './component.props';
import { chunkArray } from './constants';
import React, { useCallback, useRef } from 'react';

export const TagsTableGrid = ({ tags, fetchNextPage, hasNextPage }: TagsTableProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTagRef = useCallback(
    (node: HTMLElement | null) => {
      if (!hasNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage],
  );
  const tagChunks = chunkArray(tags, 10);

  return (
    <div>
      {tagChunks.map((chunk, chunkIndex) => {
        const isMirrored = (chunkIndex + 1) % 2 === 0;
        return (
          <div key={chunkIndex} className={isMirrored ? 'transform scale-x-[-1]' : ''}>
            <TagChunk
              chunk={chunk}
              isMirrored={isMirrored}
              lastTagRef={chunkIndex === tagChunks.length - 1 ? lastTagRef : null}
            />
          </div>
        );
      })}
    </div>
  );
};

const TagChunk = React.memo(
  ({
    chunk,
    isMirrored,
    lastTagRef,
  }: {
    chunk: Tag[];
    isMirrored: boolean;
    lastTagRef: ((node: HTMLElement | null) => void) | null;
  }) => {
    const mirroredClass = isMirrored ? 'transform scale-x-[-1]' : '';

    // Определяем индекс последнего существующего элемента
    const lastIndex = [...chunk]
      .map((tag, i) => (tag ? i : -1))
      .reverse()
      .find(i => i !== -1);
    const isLast = (index: number) => index === lastIndex;
    return (
      <div key={chunk[0]?.id || Math.random()} className="grid grid-flow-col gap-4 mb-4">
        {chunk[0] && (
          <div className={isMirrored ? 'transform scale-x-[-1]' : ''}>
            <TagCell className="bg-base-grey-07 min-w-[175px]" tag={chunk[0]} ref={isLast(0) ? lastTagRef : null} />
          </div>
        )}
        {chunk[1] && (
          <div className={`grid grid-flow-row gap-2 ${mirroredClass}`}>
            <div>
              <TagCell className="bg-base-red-01" tag={chunk[1]} ref={isLast(1) ? lastTagRef : null} />
            </div>
            {(chunk[2] || chunk[3]) && (
              <div className="grid grid-flow-col gap-2">
                {chunk[2] && (
                  <div>
                    <TagCell className="bg-base-yellow-01" tag={chunk[2]} ref={isLast(2) ? lastTagRef : null} />
                  </div>
                )}
                {chunk[3] && (
                  <div>
                    <TagCell className="bg-base-blue-05" tag={chunk[3]} ref={isLast(3) ? lastTagRef : null} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {chunk[4] && (
          <div className={`grid grid-flow-row gap-2 ${mirroredClass}`}>
            <div>
              <TagCell className="bg-base-blue-06" tag={chunk[4]} ref={isLast(4) ? lastTagRef : null} />
            </div>
            {(chunk[5] || chunk[6]) && (
              <div className="grid grid-flow-col gap-2">
                {chunk[5] && (
                  <div>
                    <TagCell className="bg-base-grey-10" tag={chunk[5]} ref={isLast(5) ? lastTagRef : null} />
                  </div>
                )}
                {chunk[6] && (
                  <div>
                    <TagCell className="bg-base-blue-04" tag={chunk[6]} ref={isLast(6) ? lastTagRef : null} />
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
                    <TagCell className="bg-base-green-03" tag={chunk[7]} ref={isLast(7) ? lastTagRef : null} />
                  </div>
                )}
                {chunk[8] && (
                  <div>
                    <TagCell className="bg-base-orange-03" tag={chunk[8]} ref={isLast(8) ? lastTagRef : null} />
                  </div>
                )}
              </div>
            )}
            {chunk[9] && (
              <div>
                <TagCell className="bg-base-grey-11" tag={chunk[9]} ref={isLast(9) ? lastTagRef : null} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

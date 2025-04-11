import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { QuestionRowProps, QuestionTableProps } from './component.props';
import { getTimeAgo } from './constants';
import { ClipLoader } from 'react-spinners';
import { forwardRef, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';

const QuestionsRow = forwardRef<HTMLDivElement, QuestionRowProps>(({ question }, ref) => {
  const { fileUrl, isLoading } = useFileUrl(question?.author?.avatar?.id, true);
  return (
    <div
      ref={ref}
      className="grid grid-cols-4 border py-2"
      style={{
        gridTemplateColumns: 'minmax(220px, auto) 1fr minmax(180px, auto) minmax(200px, auto)',
      }}
    >
      <div className="grid grid-rows-1 text-center gap-0.5">
        <div className="text-sm font-medium text-black/50 dark:text-white/50">{question.rating} голос</div>
        <div className="text-base-grey-09">{question.answers.length} ответ</div>
        <div className="text-sm font-medium text-black/50 dark:text-white/50">{question.views} просмотров</div>
      </div>
      <div className="grid grid-rows-1 overflow-hidden gap-2" style={{ gridTemplateRows: 'auto 1fr' }}>
        <Link to={ROUTER_PATHS.ANSWER_QUESTION.replace(':id', String(question.id))}>
          <div className="text-base-blue-01 font-bold text-xl">{question.title}</div>
        </Link>
        <div className="relative w-full overflow-hidden align-middle">
          <div
            className="flex gap-3 overflow-x-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            }}
          >
            {question.tags.map(tag => (
              <div
                key={tag.id}
                className="w-fit text-sm inline-block h-fit py-1 px-3 rounded-full bg-base-grey-04 text-base-grey-08"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="grid grid-flow-col items-center"
        style={{
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        {isLoading ? (
          <ClipLoader color="#ff5722" size={30} />
        ) : (
          fileUrl && (
            <div className="w-8 h-8 rounded-xl overflow-hidden">
              <img src={fileUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          )
        )}
        <span className="ml-3 text-base-blue-01">{question.author.nickname}</span>
      </div>
      <div className="grid items-center justify-center text-xs text-black/50 dark:text-white/50">
        {getTimeAgo(question.updatedAt)}
      </div>
    </div>
  );
});

export const QuestionsTable = ({ questions, fetchNextPage, hasNextPage }: QuestionTableProps) => {
  console.log(questions);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastQuestionRef = useCallback(
    node => {
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

  if (!questions || questions.length === 0) {
    return <div className="text-center text-gray-500 p-4 ">Вопросов пока нет</div>;
  }

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {questions.map((question, index) => {
        if (index === questions.length - 1) {
          return <QuestionsRow ref={lastQuestionRef} key={question.id} question={question} />;
        }
        return <QuestionsRow key={question.id} question={question} />;
      })}
    </div>
  );
};

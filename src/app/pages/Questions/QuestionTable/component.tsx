import { QuestionRowProps, QuestionTableProps } from './component.props';
import { getTimeAgo } from './constants';

const QuestionsRow = ({ question }: QuestionRowProps) => {
  return (
    <div
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
      <div className="grid grid-rows-1" style={{ gridTemplateRows: 'auto 1fr' }}>
        <div className="text-base-blue-01 font-bold text-xl">{question.title}</div>
        <div className="grid grid-flow-col items-center justify-start text-sm gap-3">
          {question.tags.map(tag => (
            <div
              key={tag.id}
              className="w-fit h-fit py-0.5 px-5 rounded-full bg-base-grey-06 text-base-grey-09 font-bold"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div
        className="grid grid-flow-col content-center"
        style={{
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        <img src={question.author?.avatar?.name ?? ''} alt="User Avatar" className="w-6 h-6 rounded-xl" />
        <span className="ml-3 text-base-blue-01">{question.author.nickname}</span>
      </div>
      <div className="grid items-center justify-center text-xs text-black/50 dark:text-white/50">
        {getTimeAgo(question.updatedAt)}
      </div>
    </div>
  );
};

export const QuestionsTable = ({ questions }: QuestionTableProps) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {questions.map(question => (
        <QuestionsRow key={question.id} question={question} />
      ))}
    </div>
  );
};

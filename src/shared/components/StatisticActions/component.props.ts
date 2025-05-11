export interface StatisticActionsProps {
  id: number;
  countLikes: number;
  countDislikes: number;
  isFavoriteInitial?: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  isSolutionInitial?: boolean;
  isOwner?: boolean;
  type?: 'question' | 'answer';
}

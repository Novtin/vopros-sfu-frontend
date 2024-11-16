import { useSelector } from 'react-redux';
import { IRootState } from '../../shared/types/rootState';

const useAppSelector = useSelector.withTypes<IRootState>();

export { useAppSelector };

import { AppDispatch } from '@/shared/types/rootState';
import { useDispatch } from 'react-redux';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppDispatch };

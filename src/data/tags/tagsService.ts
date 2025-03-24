import { GetTagsParams, TagsResponse } from '@/shared/types/tag';
import { apiClient } from '../apiClient';

export const getTags = async (params?: GetTagsParams): Promise<TagsResponse> => {
  const response = await apiClient.get<TagsResponse>('/tag', { params });
  return response.data;
};

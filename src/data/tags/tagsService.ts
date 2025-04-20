import { GetTagsParams, Tag, TagsResponse } from '@/shared/types/tag';
import { apiClient, getAuthHeaders } from '../apiClient';

export const getTags = async (params?: GetTagsParams): Promise<TagsResponse> => {
  const response = await apiClient.get<TagsResponse>('/tag', { params });
  return response.data;
};

export const getAllTags = async (): Promise<TagsResponse> => {
  const response = await apiClient.get<TagsResponse>('/tag', {
    params: {
      page: 1,
      pageSize: 10000,
      sort: 'name',
    },
  });
  return response.data;
};

export const getTagById = async (id: number): Promise<Tag> => {
  const response = await apiClient.get<Tag>(`/tag/${id}`);
  return response.data;
};

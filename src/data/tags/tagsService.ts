import { GetTagsParams, Tag, TagsResponse } from '@/shared/types/tag';
import { apiClient } from '../apiClient';

export const getTags = async (params?: GetTagsParams): Promise<TagsResponse> => {
  const response = await apiClient.get<TagsResponse>('/tag', { params });
  return response.data;
};

export const setFavoriteTags = async (tagsIds: number[]): Promise<void> => {
  await apiClient.post('/tag/favorites', { tagsIds });
};

export const getAllTags = async (pageSize: number): Promise<TagsResponse> => {
  const response = await apiClient.get<TagsResponse>('/tag', {
    params: {
      page: 1,
      pageSize,
      sort: 'name',
    },
  });
  return response.data;
};

export const getTagById = async (id: number): Promise<Tag> => {
  const response = await apiClient.get<Tag>(`/tag/${id}`);
  return response.data;
};

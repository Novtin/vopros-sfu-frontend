import { BASE_API_URL } from '@/app/consts';
import { GetTagsParams, TagsResponse } from '@/shared/types/tag';
import axios from 'axios';

export const getTags = async (params?: GetTagsParams): Promise<TagsResponse> => {
  const response = await axios.get(`${BASE_API_URL}/tag`, { params });
  return response.data;
};

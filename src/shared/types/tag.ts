export interface Tag {
  id: number;
  name: string;
}

export interface TagsResponse {
  total: number;
  items: Tag[];
}

export interface GetTagsParams {
  page?: number;
  pageSize?: number;
  id?: number;
  name?: string;
  sort?: string;
}

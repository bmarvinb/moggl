export type Tag = {
  id: string;
  name: string;
  archived: boolean;
};

export type TagsSearchCriteria = {
  archived?: string;
  name?: string;
  page?: string;
  'page-size'?: string;
};

export type TaskRequestOptions = {
  'is-active'?: boolean;
  name?: string;
  page?: number;
  'page-size'?: number;
  'strict-name-search'?: boolean;
  'sort-column'?: 'ID' | 'NAME';
  'sort-order'?: 'ASCENDING' | 'DESCENDING';
};

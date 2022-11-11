import React from 'react';

export type TagsSearchFilterCriteria = {
  name: string;
  archived: 'true' | 'false';
};

export function useTagSearchCriteria() {
  const [searchCriteria, setSearchCriteria] =
    React.useState<TagsSearchFilterCriteria>({
      name: '',
      archived: 'false',
    });
  return [searchCriteria, setSearchCriteria] as const;
}

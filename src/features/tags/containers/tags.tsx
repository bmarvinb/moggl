import { PageSpinner } from 'common/components/PageSpinner';
import { TagsContent } from 'features/tags/components/TagsContent';
import { TagsFilterCriteria } from 'features/tags/components/TagsFilter';
import { useTags } from 'features/tags/hooks/useTags';
import { useState } from 'react';

export const Tags = () => {
  const [searchCriteria, setSearchCriteria] = useState<
    TagsFilterCriteria | undefined
  >({
    name: '',
    archived: 'true',
  });

  const tags = useTags(searchCriteria);
  console.log('status =>', tags.status);

  switch (tags.status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return (
        <TagsContent
          searchCriteria={searchCriteria}
          tags={tags.data}
          onFilterChange={criteria => {
            console.log('filter', criteria);

            setSearchCriteria(criteria);
          }}
        />
      );
  }
};

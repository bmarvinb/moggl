import { PageSpinner } from 'common/components/PageSpinner';
import { useDebounce } from 'core/hooks/useDebounce';
import { TagsContent } from 'features/tags/components/TagsContent';
import { TagsFilterCriteria } from 'features/tags/components/TagsFilter';
import { useTags } from 'features/tags/hooks/useTags';
import { useState } from 'react';

export const Tags = () => {
  const [criteria, setCriteria] = useState<TagsFilterCriteria>({
    name: '',
    archived: 'true',
  });
  const debouncedCriteria = useDebounce(criteria);
  const { status, fetchStatus, data } = useTags(debouncedCriteria);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return (
        <TagsContent
          fetching={fetchStatus === 'fetching'}
          searchCriteria={criteria}
          tags={data}
          onFilterChange={criteria => setCriteria(criteria)}
        />
      );
  }
};

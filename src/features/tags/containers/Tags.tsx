import { PageSpinner } from 'shared/components/PageSpinner';
import { useDebounce } from 'shared/hooks/debounce';
import { TagsContent } from 'features/tags/containers/TagsContent';
import { TagsFilterCriteria } from 'features/tags/components/TagsFilter';
import { useTags } from 'features/tags/hooks/tags';
import { useState } from 'react';

export const Tags = () => {
  const [criteria, setCriteria] = useState<TagsFilterCriteria>({
    name: '',
    archived: 'false',
  });
  const debouncedCriteria = useDebounce(criteria);
  const { status, fetchStatus, data } = useTags(debouncedCriteria);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return (
        <div className="ml-4 flex h-24 border-2 border-gray-300 p-3 text-gray-700 shadow-md"></div>
      );
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

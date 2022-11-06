import { PageSpinner } from 'components/PageSpinner';
import { useGetTags } from 'features/tags/api/getTags';
import { TagsFilterCriteria } from 'features/tags/components/TagsFilter';
import { TagsContent } from 'features/tags/components/TagsContent';
import { useDebounce } from 'hooks/debounce';
import { useState } from 'react';

export const Tags = () => {
  const [criteria, setCriteria] = useState<TagsFilterCriteria>({
    name: '',
    archived: 'false',
  });
  const debouncedCriteria = useDebounce(criteria);
  const { status, fetchStatus, data } = useGetTags(debouncedCriteria);

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

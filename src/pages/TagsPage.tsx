import { Head } from 'common/components/Elements/Head';
import { PageSpinner } from 'common/components/PageSpinner';
import { TagsContent, TagsFilterCriteria, useGetTags } from 'features/tags';
import { useDebounce } from 'common/hooks/useDebounce';
import { useState } from 'react';

// TODO: refactor
export const TagsPage = () => {
  const [criteria, setCriteria] = useState<TagsFilterCriteria>({
    name: '',
    archived: 'false',
  });
  const debouncedCriteria = useDebounce(criteria);
  const { status, fetchStatus, data: tags } = useGetTags(debouncedCriteria);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return (
        <div className="ml-4 flex h-24 border-2 border-gray-300 p-3 text-gray-700 shadow-md"></div>
      );
    case 'success':
      return (
        <>
          <Head title="Tags" />
          <TagsContent
            fetching={fetchStatus === 'fetching'}
            searchCriteria={criteria}
            tags={tags}
            onFilterChange={criteria => setCriteria(criteria)}
          />
        </>
      );
  }
};

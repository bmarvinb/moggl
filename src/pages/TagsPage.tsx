import { Head } from 'common/components/Elements/Head';
import { PageSpinner } from 'common/components/PageSpinner';
import { TagsContent, TagsSearchCriteria, useGetTags } from 'features/tags';
import { useDebounce } from 'common/hooks/useDebounce';
import { useState } from 'react';
import { ErrorFallback } from 'common/components/ErrorFallback';

export const TagsPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<TagsSearchCriteria>({
    name: '',
    archived: 'false',
  });
  const debouncedSearchCriteria = useDebounce(searchCriteria);
  const {
    status,
    fetchStatus,
    data: tags,
  } = useGetTags(debouncedSearchCriteria);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <ErrorFallback />;
    case 'success':
      return (
        <>
          <Head title="Tags" />
          <TagsContent
            fetching={fetchStatus === 'fetching'}
            searchCriteria={searchCriteria}
            tags={tags}
            onFilterChange={criteria => {
              setSearchCriteria(criteria);
            }}
          />
        </>
      );
  }
};

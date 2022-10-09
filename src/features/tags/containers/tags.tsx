import { PageSpinner } from 'common/components/PageSpinner';
import { TagsContent } from 'features/tags/components/TagsContent';
import { useTags } from 'features/tags/hooks/useTags';

export const Tags = () => {
  const { status, data: tags } = useTags();

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return <TagsContent tags={tags} />;
  }
};

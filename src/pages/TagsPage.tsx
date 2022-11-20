import { Container } from 'common/components/Container';
import { Button } from 'common/components/Elements/Button';
import { ErrorFallback } from 'common/components/ErrorFallback';
import { PageSpinner } from 'common/components/PageSpinner';
import { Title } from 'common/components/Title';
import { useDebounce } from 'common/hooks/useDebounce';
import { useDialog } from 'common/hooks/useDialog';
import {
  AddTagDialog,
  TagsFilter,
  Tags,
  useTags,
  useTagSearchCriteria,
} from 'features/tags';

export const TagsPage = () => {
  const [criteria, setCriteria] = useTagSearchCriteria();
  const [isOpen, { open, close }] = useDialog();
  const debouncedCriteria = useDebounce(criteria);
  const tags = useTags(debouncedCriteria);

  switch (tags.status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <ErrorFallback />;
    case 'success':
      return (
        <>
          <Container>
            <div className="mb-5 flex items-center justify-between">
              <Title>Tags</Title>
              <Button variant="primary" onClick={open}>
                Add new
              </Button>
            </div>

            <TagsFilter criteria={criteria} onFilterChange={setCriteria} />

            <Tags tags={tags.data} searchTerm={criteria.name} />

            <AddTagDialog
              open={isOpen}
              onOpenChange={close}
              onSuccess={close}
            />
          </Container>
        </>
      );
  }
};

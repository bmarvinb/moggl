import { Container } from 'common/components/Container';
import { Button } from 'common/components/Elements/Button';
import { Head } from 'common/components/Elements/Head';
import { ErrorFallback } from 'common/components/ErrorFallback';
import { PageSpinner } from 'common/components/PageSpinner';
import { Title } from 'common/components/Title';
import { useDebounce } from 'common/hooks/useDebounce';
import { useDialog } from 'common/hooks/useDialog';
import {
  AddTagDialog,
  TagsFilter,
  TagsList,
  useGetTags,
  useTagSearchCriteria,
} from 'features/tags';

export const TagsPage = () => {
  const [criteria, setCriteria] = useTagSearchCriteria();
  const [isOpen, { open, close }] = useDialog();
  const debouncedCriteria = useDebounce(criteria);
  const { status, data: tags } = useGetTags(debouncedCriteria);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <ErrorFallback />;
    case 'success':
      return (
        <>
          <Head title="Tags" description="Tags management" />
          <Container>
            <div className="mb-5 flex items-center justify-between">
              <Title>Tags</Title>
              <Button variant="primary" onClick={open}>
                Add new
              </Button>
            </div>

            <TagsFilter criteria={criteria} onFilterChange={setCriteria} />

            <TagsList tags={tags} searchTerm={criteria.name} />

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

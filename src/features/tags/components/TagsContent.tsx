import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Container } from 'common/components/Container';
import { Dialog } from 'common/components/Dialog';
import { List } from 'common/components/List';
import { Title } from 'common/components/Title';
import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import { TagListItem } from 'features/tags/components/TagListItem';
import {
  TagsFilter,
  TagsFilterCriteria,
} from 'features/tags/components/TagsFilter';
import { Tags } from 'features/tags/models/tags';
import { FC, useState } from 'react';

export type TagsContentProps = {
  fetching: boolean;
  searchCriteria: TagsFilterCriteria | undefined;
  tags: Tags;
  onFilterChange: (changes: TagsFilterCriteria) => void;
};

export const TagsContent: FC<TagsContentProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onTagAdded = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['tags']);
  };

  return (
    <Container
      css={{
        padding: '$8',
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '$10',
        }}
      >
        <Title as="h1">Tags</Title>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddTagDialog onSuccess={onTagAdded} />
        </Dialog>
      </Box>

      <TagsFilter
        criteria={props.searchCriteria}
        onChange={props.onFilterChange}
      />

      <List>
        {props.tags.map(tag => (
          <TagListItem key={tag.id} tag={tag} />
        ))}
      </List>
    </Container>
  );
};

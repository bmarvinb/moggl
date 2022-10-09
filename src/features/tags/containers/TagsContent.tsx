import { useQueryClient } from '@tanstack/react-query';
import { Container } from 'common/components/Container';
import { Dialog } from 'common/components/Dialog';
import { List } from 'common/components/List';
import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import { TagListItem } from 'features/tags/components/TagListItem';
import {
  TagsFilter,
  TagsFilterCriteria,
} from 'features/tags/components/TagsFilter';
import { Tags } from 'features/tags/models/tags';
import { FC, useState } from 'react';
import { TagsContentTitle } from '../components/TagsContentTitle';

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
      <TagsContentTitle addNewTag={() => setDialogOpen(true)} />
      <TagsFilter
        criteria={props.searchCriteria}
        onChange={props.onFilterChange}
      />
      <List>
        {props.tags.map(tag => (
          <TagListItem key={tag.id} tag={tag} />
        ))}
      </List>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AddTagDialog onSuccess={onTagAdded} />
      </Dialog>
    </Container>
  );
};

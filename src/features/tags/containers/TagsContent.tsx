import { Box } from 'common/components/Box';
import { Container } from 'common/components/Container';
import { List } from 'common/components/List';
import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import { TagsContentTitle } from 'features/tags/components/TagsContentTitle';
import {
  TagsFilter,
  TagsFilterCriteria,
} from 'features/tags/components/TagsFilter';
import { TagListItem } from 'features/tags/containers/TagListItem';
import { Tags } from 'features/tags/models/tags';
import { FC, useState } from 'react';

export type TagsContentProps = {
  fetching: boolean;
  searchCriteria: TagsFilterCriteria;
  tags: Tags;
  onFilterChange: (changes: TagsFilterCriteria) => void;
};

export const TagsContent: FC<TagsContentProps> = props => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const onTagAdded = () => {
    setAddDialogOpen(false);
  };

  return (
    <Container
      css={{
        padding: '$8',
      }}
    >
      <TagsContentTitle addNewTag={() => setAddDialogOpen(true)} />
      <TagsFilter
        criteria={props.searchCriteria}
        onChange={props.onFilterChange}
      />

      <List>
        {props.tags.length ? (
          props.tags.map(tag => <TagListItem key={tag.id} tag={tag} />)
        ) : (
          <Box css={{ padding: '$8' }}>Nothing found</Box>
        )}
      </List>

      <AddTagDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={onTagAdded}
      />
    </Container>
  );
};

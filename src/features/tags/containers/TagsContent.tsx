import { Box } from 'shared/components/Box';
import { Container } from 'shared/components/Container';
import { List } from 'shared/components/List';
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

      {props.tags.length ? (
        <List>
          {props.tags.map(tag => (
            <TagListItem key={tag.id} tag={tag} />
          ))}
        </List>
      ) : (
        <Box
          css={{
            padding: '$8',
            textAlign: 'center',
            fontSize: '$lg',
            color: '$neutral7',
          }}
        >
          {props.searchCriteria.name
            ? `No result found for "${props.searchCriteria.name}"`
            : 'Nothing found'}
        </Box>
      )}

      <AddTagDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={onTagAdded}
      />
    </Container>
  );
};

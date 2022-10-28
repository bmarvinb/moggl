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
    <Container className="p-8">
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
        <div className="p-8 text-center text-lg text-neutral-700 dark:text-neutral-100">
          {props.searchCriteria.name
            ? `No result found for "${props.searchCriteria.name}"`
            : 'Nothing found'}
        </div>
      )}

      <AddTagDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={onTagAdded}
      />
    </Container>
  );
};

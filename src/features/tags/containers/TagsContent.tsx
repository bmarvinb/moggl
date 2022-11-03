import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import {
  TagsFilter,
  TagsFilterCriteria,
} from 'features/tags/components/TagsFilter';
import { TagListItem } from 'features/tags/containers/TagListItem';
import { Tags } from 'features/tags/models/tags';
import React from 'react';
import { Button } from 'shared/components/Button/Button';
import { Container } from 'shared/components/Container';
import { List } from 'shared/components/List';
import { Title } from 'shared/components/Title';

export type TagsContentProps = {
  fetching: boolean;
  searchCriteria: TagsFilterCriteria;
  tags: Tags;
  onFilterChange: (changes: TagsFilterCriteria) => void;
};

export const TagsContent = (props: TagsContentProps) => {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

  const onTagAdded = () => {
    setAddDialogOpen(false);
  };

  return (
    <Container className="p-8">
      <div className="mb-5 flex items-center justify-between">
        <Title>Tags</Title>
        <Button
          variant="primary"
          onClick={() => {
            console.log('click');
            setAddDialogOpen(true);
          }}
        >
          Add new
        </Button>
      </div>
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
        <div className="p-4 text-center text-lg text-neutral-700 dark:text-neutral-100">
          {props.searchCriteria.name
            ? `No result found for "${props.searchCriteria.name}"`
            : 'Nothing found'}
        </div>
      )}

      <AddTagDialog
        open={addDialogOpen}
        onOpenChange={() => {
          setAddDialogOpen(false);
        }}
        onSuccess={onTagAdded}
      />
    </Container>
  );
};

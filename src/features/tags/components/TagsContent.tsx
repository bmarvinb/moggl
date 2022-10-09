import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Dialog } from 'common/components/Dialog';
import { Title } from 'common/components/Title';
import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import { Tags } from 'features/tags/models/tags';
import { FC, useState } from 'react';

export type TagsContentProps = {
  tags: Tags;
};

export const TagsContent: FC<TagsContentProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onClientAdded = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['tags']);
  };

  return (
    <Box
      css={{
        padding: '$8',
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '$8',
        }}
      >
        <Title as="h1">Tags</Title>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddTagDialog onTagAdded={onClientAdded} /> </Dialog>
      </Box>
      {props.tags.map(tag => {
        return <Box key={tag.id}>{tag.name}</Box>;
      })}
    </Box>
  );
};

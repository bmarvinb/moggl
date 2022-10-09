import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Dialog } from 'common/components/Dialog';
import { ListItem } from 'common/components/List';
import { UpdateTagDialog } from 'features/tags/components/UpdateTagDialog';
import { useUpdateTag } from 'features/tags/hooks/useUpdateTag';
import { Tag } from 'features/tags/models/tags';
import { FC, useState } from 'react';
import { BiArchive, BiPencil } from 'react-icons/bi';

export type TagListItemProps = {
  tag: Tag;
};

export const TagListItem: FC<TagListItemProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, status } = useUpdateTag(props.tag.id);

  const onTagUpdated = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['tags']);
  };

  const archive = (archived: boolean) => {
    mutate(
      {
        ...props.tag,
        archived,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tags']);
        },
      },
    );
  };

  return (
    <ListItem
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      key={props.tag.id}
    >
      <Box>{props.tag.name}</Box>
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gridColumnGap: '$4',
          alignItems: 'center',
        }}
      >
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button
            variant="icon"
            size="md"
            color="transparent"
            aria-label="Edit tag"
            onClick={() => setDialogOpen(true)}
          >
            <BiPencil title="Edit tag" />
          </Button>
          <UpdateTagDialog tag={props.tag} onSuccess={onTagUpdated} />
        </Dialog>

        <Button
          variant="icon"
          size="md"
          color="transparent"
          aria-label={props.tag.archived ? 'Unarchive' : 'Archive'}
          onClick={() => archive(!props.tag.archived)}
          disabled={status === 'loading'}
        >
          <BiArchive title={props.tag.archived ? 'Unarchive' : 'Archive'} />
        </Button>
      </Box>
    </ListItem>
  );
};

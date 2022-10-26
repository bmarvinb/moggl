import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import { ListItem } from 'shared/components/List';
import { Tag } from 'features/tags/models/tags';
import { FC } from 'react';
import { BiArchive, BiPencil, BiTrash } from 'react-icons/bi';

export type TagListViewItemProps = {
  tag: Tag;
  updateTagStatus: string;
  deleteTagStatus: string;
  onEdit: () => void;
  onArchive: (archived: boolean) => void;
  onDelete: () => void;
};

export const TagListViewItem: FC<TagListViewItemProps> = props => {
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
          display: 'flex',
          gap: '$4',
          alignItems: 'center',
        }}
      >
        <Button
          variant="icon"
          size="md"
          color="transparent"
          aria-label="Edit tag"
          onClick={() => props.onEdit()}
        >
          <BiPencil title="Edit tag" />
        </Button>

        <Button
          variant="icon"
          size="md"
          color="transparent"
          aria-label={props.tag.archived ? 'Restore' : 'Archive'}
          onClick={() => props.onArchive(!props.tag.archived)}
          disabled={props.updateTagStatus === 'loading'}
        >
          <BiArchive title={props.tag.archived ? 'Unarchive' : 'Archive'} />
        </Button>

        {props.tag.archived && (
          <Button
            variant="icon"
            size="md"
            color="transparent"
            aria-label="Delete"
            onClick={() => props.onDelete()}
            disabled={props.deleteTagStatus === 'loading'}
          >
            <BiTrash title="Delete" />
          </Button>
        )}
      </Box>
    </ListItem>
  );
};

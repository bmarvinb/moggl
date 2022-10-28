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
    <ListItem className="align-center flex justify-between" key={props.tag.id}>
      <div>{props.tag.name}</div>
      <div className="align-center flex gap-4">
        <button aria-label="Edit tag" onClick={() => props.onEdit()}>
          <BiPencil title="Edit tag" />
        </button>

        <button
          aria-label={props.tag.archived ? 'Restore' : 'Archive'}
          onClick={() => props.onArchive(!props.tag.archived)}
          disabled={props.updateTagStatus === 'loading'}
        >
          <BiArchive title={props.tag.archived ? 'Unarchive' : 'Archive'} />
        </button>

        {props.tag.archived && (
          <button
            aria-label="Delete"
            onClick={() => props.onDelete()}
            disabled={props.deleteTagStatus === 'loading'}
          >
            <BiTrash title="Delete" />
          </button>
        )}
      </div>
    </ListItem>
  );
};

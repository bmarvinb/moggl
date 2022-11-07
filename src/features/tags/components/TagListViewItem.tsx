import { ButtonIcon } from 'components/Elements/ButtonIcon';
import { ListItem } from 'components/List';
import { BiArchive, BiPencil, BiTrash } from 'react-icons/bi';
import { Tag } from '../types';

export type TagListViewItemProps = {
  tag: Tag;
  updateTagStatus: string;
  deleteTagStatus: string;
  onEdit: () => void;
  onArchive: (archived: boolean) => void;
  onDelete: () => void;
};

export const TagListViewItem = (props: TagListViewItemProps) => {
  return (
    <ListItem className="align-center flex justify-between" key={props.tag.id}>
      <div>{props.tag.name}</div>
      <div className="align-center flex gap-4">
        <ButtonIcon
          icon={
            <BiPencil
              title="Edit tag"
              onClick={() => {
                props.onEdit();
              }}
            />
          }
        />
        <ButtonIcon
          icon={
            <BiArchive title={props.tag.archived ? 'Unarchive' : 'Archive'} />
          }
          onClick={() => {
            props.onArchive(!props.tag.archived);
          }}
        />

        {props.tag.archived && (
          <ButtonIcon
            onClick={() => props.onDelete()}
            icon={<BiTrash />}
            variant="transparent"
          />
        )}
      </div>
    </ListItem>
  );
};

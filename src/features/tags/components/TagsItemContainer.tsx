import { useDialog } from 'common/hooks/useDialog';
import { useDeleteTag } from '../hooks/useDeleteTag';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { Tag } from '../types';
import { TagsItem } from './TagsItem';
import { UpdateTagDialog } from './UpdateTagDialog';

export type TagListItemProps = {
  tag: Tag;
};

export const TagsItemContainer = (props: TagListItemProps) => {
  const [isOpened, { open, close }] = useDialog();
  const { mutate: updateTag, status: updateTagStatus } = useUpdateTag(
    props.tag.id,
  );
  const { mutate: deleteTag, status: deleteTagStatus } = useDeleteTag(
    props.tag.id,
  );

  const onArchive = (archived: boolean) => {
    updateTag({
      ...props.tag,
      archived,
    });
  };

  const onDelete = () => {
    deleteTag();
  };

  return (
    <>
      <TagsItem
        tag={props.tag}
        updateTagStatus={updateTagStatus}
        deleteTagStatus={deleteTagStatus}
        onEdit={open}
        onArchive={onArchive}
        onDelete={onDelete}
      />
      <UpdateTagDialog
        open={isOpened}
        tag={props.tag}
        onOpenChange={close}
        onSuccess={close}
      />
    </>
  );
};

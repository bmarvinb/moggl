import { TagListViewItem } from 'features/tags/components/TagListViewItem';
import { UpdateTagDialog } from 'features/tags/components/UpdateTagDialog';
import { useDeleteTag } from 'features/tags/hooks/useDeleteTag';
import { useUpdateTag } from 'features/tags/hooks/useUpdateTag';
import { Tag } from 'features/tags/models/tags';
import { FC, useState } from 'react';

export type TagListItemProps = {
  tag: Tag;
};

export const TagListItem: FC<TagListItemProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: updateTag, status: updateTagStatus } = useUpdateTag(
    props.tag.id,
  );
  const { mutate: deleteTag, status: deleteTagStatus } = useDeleteTag(
    props.tag.id,
  );

  const onTagUpdated = () => {
    setDialogOpen(false);
  };

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
      <TagListViewItem
        tag={props.tag}
        updateTagStatus={updateTagStatus}
        deleteTagStatus={deleteTagStatus}
        onEdit={() => setDialogOpen(true)}
        onArchive={onArchive}
        onDelete={onDelete}
      />
      <UpdateTagDialog
        open={dialogOpen}
        tag={props.tag}
        onOpenChange={setDialogOpen}
        onSuccess={onTagUpdated}
      />
    </>
  );
};

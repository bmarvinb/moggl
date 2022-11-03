import { TagListViewItem } from 'features/tags/components/TagListViewItem';
import { UpdateTagDialog } from 'features/tags/components/UpdateTagDialog';
import { useDeleteTag } from 'features/tags/hooks/deleteTag';
import { useUpdateTag } from 'features/tags/hooks/updateTag';
import { Tag } from 'features/tags/models/tags';
import React from 'react';

export type TagListItemProps = {
  tag: Tag;
};

export const TagListItem = (props: TagListItemProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
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

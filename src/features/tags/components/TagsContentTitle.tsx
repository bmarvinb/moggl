import { FC } from 'react';
import { Button } from 'shared/components/Button';
import { Title } from 'shared/components/Title';

export type TagsContentTitleProps = {
  addNewTag: () => void;
};

export const TagsContentTitle: FC<TagsContentTitleProps> = props => {
  return (
    <div className="mb-5 flex justify-between align-baseline">
      <Title>Tags</Title>
      <Button color="primary" onClick={props.addNewTag}>
        Add new
      </Button>
    </div>
  );
};
